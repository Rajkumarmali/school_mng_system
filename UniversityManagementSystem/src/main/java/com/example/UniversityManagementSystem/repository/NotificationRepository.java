package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}