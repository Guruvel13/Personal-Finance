package com.finance.tracker.controllers;

import com.finance.tracker.models.Income;
import com.finance.tracker.repositories.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Date;

@RestController
@RequestMapping("/api/v1/income")
public class IncomeController {

    @Autowired
    private IncomeRepository incomeRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addIncome(@RequestBody Income income) {
        // Mock userId since proper auth needs a jwt filter
        income.setUserId("mockUserId");
        if(income.getDate() == null) income.setDate(new Date());
        Income saved = incomeRepository.save(income);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/get")
    public ResponseEntity<?> getIncome() {
        // Normally extract userId from JWT Context
        String userId = "mockUserId"; 
        List<Income> incomes = incomeRepository.findByUserIdOrderByDateDesc(userId);
        return ResponseEntity.ok(incomes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIncome(@PathVariable String id) {
        incomeRepository.deleteById(id);
        return ResponseEntity.ok("Income deleted successfully");
    }
}
