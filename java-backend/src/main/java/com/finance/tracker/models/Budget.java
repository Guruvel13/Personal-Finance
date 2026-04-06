package com.finance.tracker.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "budgets")
public class Budget {
    @Id
    private String id;
    private String userId;
    private String category;
    private Double amount;
    private Date startDate;
    private Boolean notify;
    private String icon;
    private Date createdAt;
    private Date updatedAt;
}
