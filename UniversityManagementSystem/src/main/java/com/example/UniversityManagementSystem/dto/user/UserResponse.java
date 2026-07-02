package com.example.UniversityManagementSystem.dto.user;

import com.example.UniversityManagementSystem.dto.student.StudentResponse;
import com.example.UniversityManagementSystem.dto.teacher.TeacherResponse;
import com.example.UniversityManagementSystem.entity.Student;

import java.util.List;

public class UserResponse {
    private Long id;
    private String email;
    private String userName;
    private String userImage;
    private List<RoleResponse> roleResponse;
    private TeacherResponse teacherResponse;
    private StudentResponse studentResponse;

    public UserResponse() {
    }

    public UserResponse(Long id, String email, String userName, String userImage, List<RoleResponse> roleResponse, TeacherResponse teacherResponse, StudentResponse studentResponse) {
        this.id = id;
        this.email = email;
        this.userName = userName;
        this.userImage = userImage;
        this.roleResponse = roleResponse;
        this.teacherResponse = teacherResponse;
        this.studentResponse = studentResponse;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public TeacherResponse getTeacherResponse() {
        return teacherResponse;
    }

    public void setTeacherResponse(TeacherResponse teacherResponse) {
        this.teacherResponse = teacherResponse;
    }

    public StudentResponse getStudentResponse() {
        return studentResponse;
    }

    public void setStudentResponse(StudentResponse studentResponse) {
        this.studentResponse = studentResponse;
    }

    public String getUserImage() {
        return userImage;
    }

    public void setUserImage(String userImage) {
        this.userImage = userImage;
    }

    public List<RoleResponse> getRoleResponse() {
        return roleResponse;
    }

    public void setRoleResponse(List<RoleResponse> roleResponse) {
        this.roleResponse = roleResponse;
    }
}
