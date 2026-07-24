package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserIdAndIsRead(Long userId, boolean b);

    Page<Notification> findByUserId(Long userId, Pageable pageable);
}