package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.auth.AuthRequest;
import com.example.UniversityManagementSystem.dto.auth.AuthResponse;
import com.example.UniversityManagementSystem.services.AuthService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImp implements AuthService {

    private CustomeUserServiceImp customeUserServiceImp;
    private PasswordEncoder passwordEncoder;
    private JwtProvider jwtProvider;

    public AuthServiceImp(CustomeUserServiceImp customeUserServiceImp, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
        this.customeUserServiceImp = customeUserServiceImp;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public AuthResponse login(AuthRequest dto) {

        String usernameOrEmail = dto.getUsernameOrEmail();
        String password = dto.getPassword();

        Authentication authentication = authicate(usernameOrEmail,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        return new AuthResponse("User login",token);
    }

    private Authentication authicate(String usernameOrEmail,String password){
        UserDetails userDetails = customeUserServiceImp.loadUserByUsername(usernameOrEmail);
        if(userDetails==null){
            throw new BadCredentialsException("Invalid Username");
        }
       if(!passwordEncoder.matches(password,userDetails.getPassword())){
           throw new BadCredentialsException("Invalid password");
       }
       return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }

}
