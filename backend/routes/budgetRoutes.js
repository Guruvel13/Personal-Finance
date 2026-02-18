const express = require("express");
const { addBudget, getBudgets, deleteBudget } = require("../controllers/budgetController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-budget", protect, addBudget); // URL: /api/v1/budget/add-budget
router.get("/get-budgets", protect, getBudgets); // URL: /api/v1/budget/get-budgets
router.delete("/delete-budget/:id", protect, deleteBudget); // URL: /api/v1/budget/delete-budget/:id

module.exports = router;
