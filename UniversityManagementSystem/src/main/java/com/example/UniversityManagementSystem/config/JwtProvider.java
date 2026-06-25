package com.example.UniversityManagementSystem.config;

import com.example.UniversityManagementSystem.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtProvider {
    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth, User user){
      String jwt = Jwts.builder()
              .setIssuedAt(new Date())
              .setExpiration(new Date(new Date().getTime()+846000000))
              .claim("email",auth.getName())
              .claim("userId",user.getId())
              .claim("collegeId",user.getCollege()!=null ? user.getCollege().getId() : null)
              .claim("universityId",user.getUniversity()!=null ? user.getUniversity().getId():null)
              .signWith(key).compact();

      return jwt;
    }

    public String getEmailFromToken(String jwt){
        jwt = jwt.substring(7);
        Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        String email = String.valueOf(claims.get("email"));
        return email;
    }

    public Long getUserIdFromToken(String jwt){
        jwt = jwt.substring(7);
        Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        Long userId = claims.get("userId",Long.class);
        return userId;
    }

    public Long getCollegeIdFromToken(String jwt){
        jwt = jwt.substring(7);
        Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        Long collegId = claims.get("collegeId",Long.class);
        return collegId;
    }

    public Long getUniversityIdFromToken(String jwt){
        jwt = jwt.substring(7);
        Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        Long universityId = claims.get("universityId",Long.class);
        return universityId;
    }
}
