package in.billmitra.controllers;

import in.billmitra.dto.MessageResponse;
import in.billmitra.dto.PasswordRequest;
import in.billmitra.dto.UserListResponse;
import in.billmitra.dto.UserResponse;
import in.billmitra.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/current")
    public ResponseEntity<UserResponse> getCurrentUser() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.getCurrentUser());
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(UserResponse.builder()
                    .user(null)
                    .message("Unable to fetch Information :" + e.getReason())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(UserResponse.builder()
                    .user(null)
                    .message("Internal server error while fetching information :" + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/admin/all")
    public ResponseEntity<UserListResponse> getAllUsers() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(UserListResponse.builder()
                    .userList(null)
                    .message("Internal server error while fetching information :" + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(UserResponse.builder()
                    .user(null)
                    .message(e.getReason())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(UserResponse.builder()
                    .user(null)
                    .message("Internal server error while fetching information :" + e.getMessage())
                    .build());
        }
    }

    @PatchMapping("/password")
    public ResponseEntity<MessageResponse> changePassword(@RequestBody PasswordRequest passwordRequest) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.updateUserPassword(passwordRequest.getNewPassword()));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(new MessageResponse(e.getReason()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Internal server error while changing password :" + e.getMessage()));
        }
    }

    @DeleteMapping("/admin/drop/user/{id}")
    public ResponseEntity<MessageResponse> dropUser(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.deleteUser(id));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(new MessageResponse(e.getReason()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Internal server error while dropping user :" + e.getMessage()));
        }
    }
}
