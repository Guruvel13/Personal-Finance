const express = require ("express");

const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel,
    getExpenseCategories
} = require("../controllers/expenseController.js");

const {protect} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/download", protect, downloadExpenseExcel);
router.get("/categories", protect, getExpenseCategories);
router.delete("/:id", protect, deleteExpense);

module.exports = router;