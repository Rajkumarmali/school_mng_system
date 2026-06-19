package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.auth.AuthRequest;
import com.example.UniversityManagementSystem.dto.auth.AuthResponse;
import com.example.UniversityManagementSystem.dto.auth.ResetPasswordRequest;
import com.example.UniversityManagementSystem.entity.Roles;
import com.example.UniversityManagementSystem.entity.Tenant;
import com.example.UniversityManagementSystem.entity.User;
import com.example.UniversityManagementSystem.repository.RolesRepository;
import com.example.UniversityManagementSystem.repository.UserRepository;
import com.example.UniversityManagementSystem.services.AuthService;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuthServiceImp implements AuthService {

    private CustomeUserServiceImp customeUserServiceImp;
    private PasswordEncoder passwordEncoder;
    private JwtProvider jwtProvider;
    private UserRepository userRepository;
    private RolesRepository rolesRepository;

    public AuthServiceImp(CustomeUserServiceImp customeUserServiceImp, PasswordEncoder passwordEncoder, JwtProvider jwtProvider, UserRepository userRepository, RolesRepository rolesRepository) {
        this.customeUserServiceImp = customeUserServiceImp;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
        this.rolesRepository = rolesRepository;
    }

    @Override
    public AuthResponse login(AuthRequest dto) {

        String usernameOrEmail = dto.getUsernameOrEmail();
        String password = dto.getPassword();

        User user = customeUserServiceImp.findUserByUsername(usernameOrEmail);

        Authentication authentication = authicate(usernameOrEmail,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication,user);
        return new AuthResponse("User login",token);
    }

    @Transactional
    @Override
    public Void createUser(String email, Tenant tenant, String role) {
        try{
            User user = new User();

            Roles roles = rolesRepository.findByNameAndTenant(role,tenant);
            
            user.setEmail(email);
            user.setUsername(email);
            user.setPassword(passwordEncoder.encode("Test@123"));
            user.setCreatedAt(LocalDateTime.now());
            user.setTenant(tenant);
            user.setRoles(List.of(roles));
            userRepository.save(user);
        } catch (Exception ex){
            throw new BadCredentialsException(ex.getMessage());
        }
        return null;
    }

    @Override
    public Void updatePassword(String email, ResetPasswordRequest dto) {
        User user = userRepository.findByEmail(email);
        if(!passwordEncoder.matches(dto.getOldPassword(),user.getPassword())){
            throw new BadCredentialsException("Invalid old password");
        }
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);
        return null;
    }

    @Override
    public void resetPassword(Long id, String password) {
       User user = userRepository.findById(id).orElseThrow(()->new IllegalArgumentException("User not found"));
       user.setPassword(passwordEncoder.encode(password));
       user.setUpdatedAt(LocalDateTime.now());
       userRepository.save(user);
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
