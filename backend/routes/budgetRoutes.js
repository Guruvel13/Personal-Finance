const { addBudget, getBudgets, deleteBudget, updateBudget } = require("../controllers/budgetController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-budget", protect, addBudget); 
router.get("/get-budgets", protect, getBudgets);
router.put("/update-budget/:id", protect, updateBudget);
router.delete("/delete-budget/:id", protect, deleteBudget);

module.exports = router;
