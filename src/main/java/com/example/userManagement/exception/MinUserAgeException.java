package com.example.userManagement.exception;

public class MinUserAgeException extends RuntimeException {
    public MinUserAgeException(String errorMessage) {
        super(errorMessage);
    }
}