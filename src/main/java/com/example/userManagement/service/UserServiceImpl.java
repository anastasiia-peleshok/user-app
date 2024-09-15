package com.example.userManagement.service;

import com.example.userManagement.entity.User;
import com.example.userManagement.exception.MinUserAgeException;
import com.example.userManagement.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    @Value("${assignment.majorityAge}")
    private int majorityAge;
    private final UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public User saveUser(User user) {
        checkMajority(user);
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUser(long theId) {
        return userRepository.findById(theId);
    }

    @Override
    @Transactional
    public Optional<User> updateUser(long theId, User userDetails) {
        return userRepository.findById(theId)
                .map(user -> {
                    checkMajority(userDetails);
                    user.setFirstName(user.getFirstName());
                    user.setLastName(userDetails.getLastName());
                    user.setEmail((userDetails.getEmail()));
                    user.setBirthDate((userDetails.getBirthDate()));
                    return userRepository.save(user);
                });
    }

    @Override
    @Transactional
    public void deleteUser(long theId) {
        userRepository.findById(theId).orElseThrow(() -> new NoSuchElementException("User with id: " + theId + " does not exist."));
        userRepository.deleteById(theId);
    }

    @Override
    public List<User> getUsersByFirstName(String firstName) {
        return userRepository.findUsersByFirstName(firstName);
    }


    private void checkMajority(User user) {
        LocalDate now = LocalDate.now();
        LocalDate minBirthDate = now.minusYears(majorityAge);
        if (user.getBirthDate().isAfter(minBirthDate)) {
            throw new MinUserAgeException("User must be at least " + majorityAge + " years old.");
        }
    }

}
