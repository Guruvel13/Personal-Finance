package com.finance.tracker.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "expenses")
public class Expense {
    @Id
    private String id;
    private String userId;
    private String icon;
    private String category;
    private String description;
    private Double amount;
    private Date date;
    private Date createdAt;
    private Date updatedAt;
}
