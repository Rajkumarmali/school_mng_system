package com.example.UniversityManagementSystem.dto.notification;

import java.io.Serializable;
import java.time.LocalDateTime;

public class NotificationResponse implements Serializable {
    private Long id;
    private String title;
    private String message;
    private Boolean isRead;
    private LocalDateTime time;

    public NotificationResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean read) {
        isRead = read;
    }
}
