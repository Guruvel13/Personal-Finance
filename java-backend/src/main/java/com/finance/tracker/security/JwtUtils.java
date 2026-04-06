package com.finance.tracker.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

    // Using the same secret from node server
    @Value("${jwt.secret:213a85b484ed21c1a4fbf2fe73af2715211b843c8ecff0b92be6c3f15f952b8e7e2a9f77f1de81718d00cfa8e0cb15651fb08ae3f1f801ccc404ada699d5c774}")
    private String jwtSecret;

    @Value("${jwt.expiration:86400000}")
    private int jwtExpirationMs;

    public String generateJwtToken(String userId) {
        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret.getBytes())
                .compact();
    }
}
