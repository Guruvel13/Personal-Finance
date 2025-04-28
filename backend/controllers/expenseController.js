const Expense = require("../models/Expense");
const xlsx = require("xlsx");


exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({
                message: "Please provide all the required fields",
            });
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({
                message: "Invalid date format. Please provide a valid date (e.g., 2025-04-07)."
            });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: parsedDate,
        });

        await newExpense.save();
        return res.status(200).json({ newExpense });
    } catch (err) {
        console.error("Add  Error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        return res.status(200).json({ expense });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}
exports.deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense deleted successfully"});
    }catch(err){
        res.status(500).json({message: "Server error"});
    }
}
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find ({userId}).sort({date: -1});
        const data = expense.map((item) => ({
            Category: item.category,
            Amount : item.amount,
            Date : item.date,
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "expense_details.xlsx");  
        res.download("expense_details.xlsx");
    }catch(error){
        
        res.status(500).json({message: "Server error"});
    }
}