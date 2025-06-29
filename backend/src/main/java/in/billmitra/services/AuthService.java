package in.billmitra.services;

import in.billmitra.dto.AuthRequest;
import in.billmitra.dto.RegisterStoreRequest;
import in.billmitra.dto.RegisterUserRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    void registerStoreAndOwner(RegisterStoreRequest request, HttpServletResponse response);

    void loginUser(AuthRequest request, HttpServletResponse response);

    void registerUser(RegisterUserRequest request, HttpServletResponse response);

    void logoutUser(HttpServletResponse response);
}
