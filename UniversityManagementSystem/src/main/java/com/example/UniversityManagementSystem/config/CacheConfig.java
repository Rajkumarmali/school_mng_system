package com.example.UniversityManagementSystem.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;

@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager(
                "college",
                "colleges",
                "user",
                "users",
                "student",
                "students",
                "teacher",
                "teachers"
        );
    }
}
