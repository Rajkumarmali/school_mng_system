package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.AttendanceStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class StudentAttendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    private AttendanceStatus status;

    @ManyToOne
    private StudentSubject studentSubject;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public StudentAttendance() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public AttendanceStatus getStatus() {
        return status;
    }

    public void setStatus(AttendanceStatus status) {
        this.status = status;
    }

    public StudentSubject getStudentSubject() {
        return studentSubject;
    }

    public void setStudentSubject(StudentSubject studentSubject) {
        this.studentSubject = studentSubject;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
