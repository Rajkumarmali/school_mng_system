package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.notification.NotificationRequest;
import com.example.UniversityManagementSystem.dto.notification.NotificationResponse;
import org.springframework.data.domain.Page;

public interface NotificationService {
    String createNotification(NotificationRequest dto);
    Page<NotificationResponse> getAllNotification(Long userId,int pageNumber,int pageSize);
    NotificationResponse getNotificationById(Long notificationId);
    String updateNotification(Long notificationId);
    Integer getUnreadNotificationCount(Long userId);
}
