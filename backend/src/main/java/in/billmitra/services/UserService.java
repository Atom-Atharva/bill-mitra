package in.billmitra.services;

import in.billmitra.dto.MessageResponse;
import in.billmitra.dto.UserListResponse;
import in.billmitra.dto.UserResponse;

public interface UserService {
    UserResponse getCurrentUser();
    UserListResponse getAllUsers();
    UserResponse getUserById(Long id);
    MessageResponse updateUserPassword(String newPassword);
    MessageResponse deleteUser(Long id);
}
