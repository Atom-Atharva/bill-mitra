package in.billmitra.controllers;

import in.billmitra.dto.AuthRequest;
import in.billmitra.dto.MessageResponse;
import in.billmitra.dto.RegisterStoreRequest;
import in.billmitra.dto.RegisterUserRequest;
import in.billmitra.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register/store")
    public ResponseEntity<MessageResponse> registerStore(@RequestBody RegisterStoreRequest request, HttpServletResponse response) {
        try {
            authService.registerStoreAndOwner(request, response);
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(new MessageResponse(e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(e.getMessage()));
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponse("Store registered successfully"));
    }

    @PostMapping("/register/user")
    public ResponseEntity<MessageResponse> registerUser(@RequestBody RegisterUserRequest request) {
        try {
            authService.registerUser(request);
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(new MessageResponse(e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(e.getMessage()));
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponse("User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<MessageResponse> loginUser(@RequestBody AuthRequest request, HttpServletResponse response) {
        try {
            authService.loginUser(request, response);
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(new MessageResponse(e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(e.getMessage()));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Login successful"));
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageResponse> logoutUser(HttpServletResponse response) {
        try {
            authService.logoutUser(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(e.getMessage()));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Logout successful"));
    }
}
