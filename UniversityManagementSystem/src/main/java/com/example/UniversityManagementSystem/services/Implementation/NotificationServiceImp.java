package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.notification.NotificationRequest;
import com.example.UniversityManagementSystem.dto.notification.NotificationResponse;
import com.example.UniversityManagementSystem.entity.Notification;
import com.example.UniversityManagementSystem.entity.User;
import com.example.UniversityManagementSystem.repository.NotificationRepository;
import com.example.UniversityManagementSystem.repository.UserRepository;
import com.example.UniversityManagementSystem.services.NotificationService;
import jakarta.transaction.Transactional;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationServiceImp  implements NotificationService {

    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    public NotificationServiceImp(UserRepository userRepository,
                                  NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "notifications",allEntries = true),
            @CacheEvict(cacheNames = "notificationCount",allEntries = true)
    })
    public String createNotification(NotificationRequest dto) {
        User user = userRepository.findByEmail(dto.getUserEmail());

        if(user==null){
            return "User not found";
        }

        Notification notification = new Notification();
        notification.setTitle(dto.getTitle());
        notification.setMessage(dto.getMessage());
        notification.setIsRead(false);
        notification.setUser(user);
        notification.setCreatedAt(LocalDateTime.now());
        notificationRepository.save(notification);

        return "Create notification successfully";
    }

    @Override
    @Cacheable(cacheNames = "notifications",key = "{#userId,#pageNumber,#pageSize}")
    public Page<NotificationResponse> getAllNotification(Long userId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Notification> notifications = notificationRepository.findByUserId(userId,pageable);
        Page<NotificationResponse> responses = notifications.map(notification -> {
            NotificationResponse res = new NotificationResponse();
            res.setId(notification.getId());
            res.setTitle(notification.getTitle());
            res.setMessage(notification.getMessage());
            res.setIsRead(notification.getIsRead());
            res.setTime(notification.getCreatedAt());
            return res;
        });
        return responses;
    }

    @Override
    @Cacheable(cacheNames = "notification",key = "#notificationId")
    public NotificationResponse getNotificationById(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(()->
                new IllegalArgumentException("Notification not found"));

        NotificationResponse response = new NotificationResponse();
        response.setId(notification.getId());
        response.setTitle(notification.getTitle());
        response.setMessage(notification.getMessage());
        response.setTime(notification.getCreatedAt());
        response.setIsRead(notification.getIsRead());
        return response;
    }

    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "notifications",allEntries = true),
            @CacheEvict(cacheNames = "notification",key = "#notificationId"),
            @CacheEvict(cacheNames = "notificationCount",allEntries = true)
    })
    public String updateNotification(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(()->
                new IllegalArgumentException("Notification not found"));
        notification.setIsRead(true);
        notificationRepository.save(notification);
        return "Update notification read successfully";
    }

    @Override
    @Cacheable(cacheNames = "notificationCount",key = "#userId")
    public Integer getUnreadNotificationCount(Long userId) {
        List<Notification> notification = notificationRepository.findByUserIdAndIsRead(userId,false);
        return notification.size();
    }
}
