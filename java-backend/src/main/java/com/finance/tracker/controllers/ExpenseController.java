package com.finance.tracker.controllers;

import com.finance.tracker.models.Expense;
import com.finance.tracker.repositories.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Date;

@RestController
@RequestMapping("/api/v1/expense")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addExpense(@RequestBody Expense expense) {
        expense.setUserId("mockUserId");
        if(expense.getDate() == null) expense.setDate(new Date());
        Expense saved = expenseRepository.save(expense);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/get")
    public ResponseEntity<?> getExpense() {
        String userId = "mockUserId"; 
        List<Expense> expenses = expenseRepository.findByUserIdOrderByDateDesc(userId);
        return ResponseEntity.ok(expenses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable String id) {
        expenseRepository.deleteById(id);
        return ResponseEntity.ok("Expense deleted successfully");
    }
}
