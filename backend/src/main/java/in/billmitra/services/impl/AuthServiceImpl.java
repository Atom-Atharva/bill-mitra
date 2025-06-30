package in.billmitra.services.impl;

import in.billmitra.dto.AuthRequest;
import in.billmitra.dto.RegisterStoreRequest;
import in.billmitra.dto.RegisterUserRequest;
import in.billmitra.entities.Role;
import in.billmitra.entities.StoreEntity;
import in.billmitra.entities.UserEntity;
import in.billmitra.repositories.StoreRepository;
import in.billmitra.repositories.UserRepository;
import in.billmitra.security.CustomUserDetails;
import in.billmitra.services.AuthService;
import in.billmitra.utils.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final StoreRepository storeRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtUtil;

    @Override
    public void registerStoreAndOwner(RegisterStoreRequest request, HttpServletResponse response) {
        // Fetch Name and create Store
        Optional<StoreEntity> existingStore = storeRepository.findByName(request.getStoreName());
        if (existingStore.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Store already exists");
        }

        String storeName = request.getStoreName();
        StoreEntity store = StoreEntity.builder().name(storeName).build();

        try {
            store = storeRepository.save(store);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to register store");
        }

        // Register User with ROLE = "OWNER"
        RegisterUserRequest registerUserRequest = RegisterUserRequest.builder()
                .email(request.getUserEmail())
                .name(request.getUserName())
                .password(request.getUserPassword())
                .role(Role.OWNER)
                .build();

        try {
            registerUserAndLogin(registerUserRequest, store.getId(), response);
        } catch (ResponseStatusException e) {
            // Delete Store
            storeRepository.delete(store);

            e.printStackTrace();
            throw e;
        } catch (Exception e) {
            // Delete Store
            storeRepository.delete(store);

            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to register user");
        }
    }

    @Override
    public void registerUser(RegisterUserRequest request) {
        Optional<UserEntity> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        }

        // Get Store from SecurityContextHolder
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long storeId = customUserDetails.getStoreId();

        try {
            saveUserInStore(request, storeId);
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public void loginUser(AuthRequest request, HttpServletResponse response) {
        // Authenticate the Credentials --> Internally doing all the work.
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        // Load the User
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        // Generate Cookie
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // true in production (HTTPS only)
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60); // 1 day in seconds

        // Add Cookie in Http Response
        response.addCookie(cookie);
    }

    @Override
    public void logoutUser(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // Instant deletion

        response.addCookie(cookie);
    }

    private void registerUserAndLogin(RegisterUserRequest request, Long storeId, HttpServletResponse response) {
        try {
            saveUserInStore(request, storeId);
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            throw e;
        }

        // Login User and Send Back Cookie
        AuthRequest authRequest = AuthRequest.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .build();

        try {
            loginUser(authRequest, response);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to login user");
        }
    }

    private void saveUserInStore(RegisterUserRequest request, Long storeId) {
        StoreEntity store = storeRepository.findById(storeId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Store not found"));

        Role role = (request.getRole() != null) ? request.getRole() : Role.EMPLOYEE;
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        UserEntity user = UserEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(hashedPassword)
                .role(role)
                .store(store)
                .build();

        try {
            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to register user");
        }
    }
}
