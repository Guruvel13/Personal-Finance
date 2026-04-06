package com.finance.tracker.repositories;

import com.finance.tracker.models.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ExpenseRepository extends MongoRepository<Expense, String> {
    List<Expense> findByUserIdOrderByDateDesc(String userId);
}
