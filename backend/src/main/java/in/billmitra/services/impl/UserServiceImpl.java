package in.billmitra.services.impl;

import in.billmitra.dto.*;
import in.billmitra.entities.UserEntity;
import in.billmitra.entities.enums.Role;
import in.billmitra.repositories.UserRepository;
import in.billmitra.security.CustomUserDetails;
import in.billmitra.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserListResponse getAllUsers() {
        CustomUserDetails userDetails = ((CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        Long storeId = userDetails.getStoreId();

        List<UserEntity> allUsers = userRepository.findAllByStore_id(storeId);

        return convertToUserListResponse(allUsers);
    }

    @Override
    public UserResponse getUserById(Long id) {
        return converToUserResponse(userRepository.findById(id));
    }

    @Override
    public MessageResponse updateUserPassword(String newPassword) {
        if (newPassword == null || newPassword.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password cannot be empty");
        }

        CustomUserDetails userDetails = ((CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        Long userId = userDetails.getUser().getId();

        try {
            UserEntity user = userRepository.getReferenceById(userId);
            String hashedPassword = passwordEncoder.encode(newPassword);
            user.setPassword(hashedPassword);
            userRepository.save(user);

            return MessageResponse.builder()
                    .message("Password updated successfully.")
                    .build();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to update password");
        }
    }

    @Override
    public MessageResponse deleteUser(Long id) {
        try {
            UserEntity user = userRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
            CustomUserDetails userDetails = ((CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
            Long storeId = userDetails.getStoreId();
            if (!Objects.equals(user.getStore().getId(), storeId)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot delete user from another store");
            }

            Role role = user.getRole();
            Role currentUserRole = userDetails.getRole();
            if (role == Role.OWNER) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot delete owner");
            }
            if (role == Role.MANAGER && currentUserRole != Role.OWNER) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot delete manager");
            }

            userRepository.delete(user);

            return MessageResponse.builder()
                    .message("User deleted successfully.")
                    .build();
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete user");
        }
    }

    private UserResponse converToUserResponse(Optional<UserEntity> user) {
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        return UserResponse.builder()
                .message("User Found.")
                .user(UserDto.builder()
                        .id(user.get().getId())
                        .name(user.get().getName())
                        .email(user.get().getEmail())
                        .role(user.get().getRole())
                        .createdBy((user.get().getCreatedBy() != null) ?
                                CreatedByDto.builder()
                                        .id(user.get().getCreatedBy().getId())
                                        .role(user.get().getCreatedBy().getRole())
                                        .username(user.get().getCreatedBy().getName())
                                        .build()
                                : null)
                        .build())
                .build();
    }

    private UserListResponse convertToUserListResponse(List<UserEntity> allUsers) {
        if (allUsers.isEmpty()) {
            return UserListResponse.builder()
                    .userList(List.of())
                    .message("No users found.")
                    .build();
        }

        List<UserDto> userDtoList = allUsers.stream()
                .map(user -> UserDto.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .createdBy((user.getCreatedBy() != null) ?
                                CreatedByDto.builder()
                                        .id(user.getCreatedBy().getId())
                                        .role(user.getCreatedBy().getRole())
                                        .username(user.getCreatedBy().getName())
                                        .build()
                                : null)
                        .role(user.getRole())
                        .build())
                .toList();

        return UserListResponse.builder()
                .userList(userDtoList)
                .message("Users fetched successfully")
                .build();
    }

    @Override
    public UserResponse getCurrentUser() {
        CustomUserDetails userDetails = ((CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        if (userDetails == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }
        return UserResponse.builder()
                .user(UserDto.builder()
                        .id(userDetails.getUser().getId())
                        .name(userDetails.getUser().getName())
                        .email(userDetails.getUser().getEmail())
                        .role(userDetails.getRole())
                        .createdBy((userDetails.getUser().getCreatedBy() != null) ?
                                CreatedByDto.builder()
                                        .id(userDetails.getUser().getCreatedBy().getId())
                                        .username(userDetails.getUser().getCreatedBy().getName())
                                        .role(userDetails.getUser().getCreatedBy().getRole())
                                        .build()
                                : null)
                        .build())
                .message("User fetched successfully")
                .build();
    }
}
