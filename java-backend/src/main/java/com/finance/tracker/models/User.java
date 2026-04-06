package com.finance.tracker.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String fullName;
    private String email;
    private String password;
    private String profileImageUrl;
    private Date createdAt;
    private Date updatedAt;
}
