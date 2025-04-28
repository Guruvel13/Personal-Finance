const Income = require("../models/Income");
const xlsx = require("xlsx");


exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
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

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: parsedDate,
        });

        await newIncome.save();
        return res.status(200).json({ newIncome });
    } catch (err) {
        console.error("Add Income Error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        return res.status(200).json({ income });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}
exports.deleteIncome = async (req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "Income deleted successfully"});
    }catch(err){
        res.status(500).json({message: "Server error"});
    }
}
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try{
        const income = await Income.find ({userId}).sort({date: -1});
        const data = income.map((item) => ({
            Source: item.source,
            Amount : item.amount,
            Date : item.date,
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");  
        res.download("income_details.xlsx");
    }catch(error){
        
        res.status(500).json({message: "Server error"});
    }
}