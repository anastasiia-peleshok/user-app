package com.example.userManagement.service;
import com.example.userManagement.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getUsers();
    Optional<User> getUser(long theId);

    User saveUser(User theUser);
    Optional<User> updateUser(long userId, User userDetails);
    void deleteUser(long theId);
    List<User> getUsersByFirstName(String firstName);
}
