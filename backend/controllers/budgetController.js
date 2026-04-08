const Budget = require("../models/Budget");

exports.addBudget = async (req, res) => {
    try {
        const { category, amount, startDate, notify, icon } = req.body;
        
        if (!category || !amount || !startDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const budget = new Budget({
            userId: req.user._id,
            category,
            amount,
            startDate,
            notify,
            icon
        });

        await budget.save();
        res.status(201).json({ message: "Budget Added Successfully", budget });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.updateBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, amount, startDate, notify, icon } = req.body;
        
        const budget = await Budget.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { category, amount, startDate, notify, icon },
            { new: true }
        );

        if (!budget) {
            return res.status(404).json({ message: "Budget not found" });
        }

        res.status(200).json({ message: "Budget Updated Successfully", budget });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const budget = await Budget.findOneAndDelete({ _id: id, userId: req.user._id });
        
        if (!budget) {
            return res.status(404).json({ message: "Budget not found" });
        }
        
        res.status(200).json({ message: "Budget Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
