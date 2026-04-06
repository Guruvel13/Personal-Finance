package com.finance.tracker.repositories;

import com.finance.tracker.models.Budget;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BudgetRepository extends MongoRepository<Budget, String> {
    List<Budget> findByUserId(String userId);
}
