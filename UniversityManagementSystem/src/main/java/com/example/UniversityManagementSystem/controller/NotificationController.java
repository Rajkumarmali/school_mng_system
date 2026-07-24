package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.notification.NotificationRequest;
import com.example.UniversityManagementSystem.dto.notification.NotificationResponse;
import com.example.UniversityManagementSystem.services.NotificationService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/notification")
public class NotificationController {

    private final NotificationService notificationService;
    private final JwtProvider jwtProvider;

    public NotificationController(NotificationService notificationService, JwtProvider jwtProvider) {
        this.notificationService = notificationService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNotificationByUserEmail(@RequestBody NotificationRequest dto){
        String res = notificationService.createNotification(dto);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @GetMapping("get/all")
    public ResponseEntity<Page<NotificationResponse>> getNotification(@RequestHeader("Authorization") String jwt,
                                                                      @RequestParam(defaultValue = "0") int pageNumber,
                                                                      @RequestParam(defaultValue = "10") int pageSize){
      Long userId = jwtProvider.getUserIdFromToken(jwt);
      Page<NotificationResponse> res = notificationService.getAllNotification(userId,pageNumber,pageSize);
      return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("get/byid/{notificationId}")
    public ResponseEntity<NotificationResponse> getNotificationById(@PathVariable Long notificationId){

        NotificationResponse res = notificationService.getNotificationById(notificationId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("update/{notificationId}")
    public ResponseEntity<String> updateNotification(@PathVariable Long notificationId){
        String res = notificationService.updateNotification(notificationId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("get/unread")
    public ResponseEntity<Integer> getUnReadNotificationCount(@RequestHeader("Authorization") String jwt){
        Long userId = jwtProvider.getUserIdFromToken(jwt);
        Integer res = notificationService.getUnreadNotificationCount(userId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
}
