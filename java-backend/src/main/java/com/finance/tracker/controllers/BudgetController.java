package com.finance.tracker.controllers;

import com.finance.tracker.models.Budget;
import com.finance.tracker.repositories.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/budget")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @PostMapping("/add-budget")
    public ResponseEntity<?> addBudget(@RequestBody Budget budget) {
        budget.setUserId("mockUserId");
        Budget saved = budgetRepository.save(budget);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/get-budgets")
    public ResponseEntity<?> getBudgets() {
        String userId = "mockUserId";
        List<Budget> budgets = budgetRepository.findByUserId(userId);
        return ResponseEntity.ok(budgets);
    }

    @DeleteMapping("/delete-budget/{id}")
    public ResponseEntity<?> deleteBudget(@PathVariable String id) {
        budgetRepository.deleteById(id);
        return ResponseEntity.ok("Budget deleted successfully");
    }
}
