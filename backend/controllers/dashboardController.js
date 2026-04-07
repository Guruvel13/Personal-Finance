const Income = require('../models/Income'); 
const Expense = require('../models/Expense');   
const Budget = require('../models/Budget');
const { isValidObjectId, Types } = require('mongoose');
const { isValidObjectId, Types } = require('mongoose');

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Fetch total income
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Fetch total expense
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Last 60 days income transactions
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        // Last 30 days expense transactions
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        // Last 5 combined transactions
        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
                ...txn.toObject(),
                type: "income",
            })),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
                ...txn.toObject(),
                type: "expense",
            })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5); // keep only top 5

        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

exports.getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Get all budgets for user where notify is true
        const budgets = await Budget.find({ userId: userObjectId, notify: true });

        // Calculate expenses per category (this month or overall depending on logic, let's do overall as it's simple)
        const expensesByCategory = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: "$category", totalSpent: { $sum: "$amount" } } }
        ]);

        const expenseMap = {};
        expensesByCategory.forEach(e => {
            expenseMap[e._id] = e.totalSpent;
        });

        const notifications = [];
        budgets.forEach(budget => {
            const spent = expenseMap[budget.category] || 0;
            if (spent > budget.amount) {
                notifications.push({
                    _id: budget._id + "_over",
                    type: "overspending",
                    category: budget.category,
                    message: `You have exceeded your budget for ${budget.category}. Budget: $${budget.amount}, Spent: $${spent}.`,
                    timestamp: new Date(),
                    icon: budget.icon || "⚠️",
                    read: false
                });
            } else if (spent > budget.amount * 0.9) {
                notifications.push({
                    _id: budget._id + "_warn",
                    type: "warning",
                    category: budget.category,
                    message: `You are nearing your budget for ${budget.category}. Budget: $${budget.amount}, Spent: $${spent}.`,
                    timestamp: new Date(),
                    icon: budget.icon || "⚠️",
                    read: false
                });
            }
        });

        // -- ADD SAMPLE NOTIFICATION FOR TESTING --
        notifications.unshift({
            _id: "test_sample_notification_" + Date.now(),
            type: "warning",
            category: "Testing",
            message: "This is a sample overspending notification pushed from the web browser!",
            timestamp: new Date(),
            icon: "🔔",
            read: false
        });

        res.json({ notifications: notifications.sort((a,b) => b.timestamp - a.timestamp) });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}
