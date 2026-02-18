import React from "react";
import InfoCard from "../Cards/InfoCard";
import { IoMdCard, IoMdWallet } from "react-icons/io";
import { LuTarget } from "react-icons/lu";
import { addThousandSeparator } from "../../utils/helper";

const BudgetOverview = ({ budgets, expenses }) => {
    // Calculate totals
    const totalBudgeted = budgets.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);

    // Create a map of expenses by category to easily sum them up
    const expenseMap = {};
    expenses.forEach(exp => {
        if (!expenseMap[exp.category]) expenseMap[exp.category] = 0;
        expenseMap[exp.category] += parseFloat(exp.amount || 0);
    });

    const totalSpent = Object.keys(expenseMap).reduce((acc, cat) => {
        // Check if category is budgeted
        const isBudgeted = budgets.some(b => b.category === cat);
        // Only count towards total spent if it's relevant to the budget (optional logic, but generally user wants total spent)
        // Or maybe total spent against the budgeted categories only?
        // Let's summing up ALL expenses for now, or just matched ones.
        // Better: sum up matched expenses.
        const matchedBudget = budgets.find(b => b.category === cat);
        if (matchedBudget) {
            return acc + expenseMap[cat];
        }
        return acc;
    }, 0);

    const remaining = totalBudgeted - totalSpent;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InfoCard
                icon={<IoMdCard />}
                label="Total Budgeted"
                value={addThousandSeparator(totalBudgeted)}
                color="text-primary bg-purple-50"
                percentage={2.5}
            />
            <InfoCard
                icon={<IoMdWallet />}
                label="Total Spent"
                value={addThousandSeparator(totalSpent)}
                color="text-orange-500 bg-orange-50"
                percentage={((totalSpent / (totalBudgeted || 1)) * 100).toFixed(1)}
            />
            <InfoCard
                icon={<LuTarget />}
                label="Remaining"
                value={addThousandSeparator(remaining)}
                color="text-green-500 bg-green-50"
                percentage={((remaining / (totalBudgeted || 1)) * 100).toFixed(1)}
            />
        </div>
    );
};

export default BudgetOverview;
