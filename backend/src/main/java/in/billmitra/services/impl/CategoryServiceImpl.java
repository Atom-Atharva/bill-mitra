package in.billmitra.services.impl;

import in.billmitra.dto.CategoryDto;
import in.billmitra.dto.CategoryListResponse;
import in.billmitra.dto.CategoryRequest;
import in.billmitra.dto.CategoryResponse;
import in.billmitra.entities.CategoryEntity;
import in.billmitra.entities.StoreEntity;
import in.billmitra.repositories.CategoryRepository;
import in.billmitra.repositories.StoreRepository;
import in.billmitra.security.CustomUserDetails;
import in.billmitra.services.CategoryService;
import in.billmitra.services.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final StoreRepository storeRepository;
    private final FileUploadService fileUploadService;

    @Override
    public CategoryResponse addCategory(CategoryRequest request, MultipartFile file) {
        // Get Store
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long storeId = customUserDetails.getStoreId();

        // Find Existing Category
        Optional<CategoryEntity> existingCategory = categoryRepository.findByStore_idAndName(storeId, request.getName());

        // If found --> Throw ERR
        if (existingCategory.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Category already exists");
        }

        StoreEntity store = storeRepository.findById(storeId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Store not found"));

        // Else --> Create Category and save with ImgUrl
        CategoryEntity category = CategoryEntity.builder()
                .name(request.getName())
                .imgUrl(null)
                .bgColor(request.getBgColor())
                .description(request.getDescription())
                .store(store)
                .build();

        // Store in S3 Bucket
        String imgUrl = null;
        try {
            imgUrl = fileUploadService.uploadFile(file);
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to upload file");
        }

        // Set ImgUrl.
        category.setImgUrl(imgUrl);

        try {
            category = categoryRepository.save(category);
        } catch (Exception e) {
            e.printStackTrace();
            try {
                fileUploadService.deleteFile(imgUrl);
            } catch (ResponseStatusException ex) {
                ex.printStackTrace();
            }
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to add category");
        }

        CategoryResponse response = convertToCategoryResponse(category);
        response.setMessage("Category added successfully");
        return response;
    }

    @Override
    public CategoryListResponse getAllCategories() {
        // Get StoreId for the user.
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long storeId = customUserDetails.getStoreId();

        // Get all categories for the store.
        List<CategoryEntity> categories = categoryRepository.findAllByStore_Id(storeId);

        // Convert and send.
        return convertToCategoryListResponse(categories);

    }

    @Override
    public CategoryResponse getCategoryById(Long id) {
        CategoryEntity category = categoryRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));

        return convertToCategoryResponse(category);
    }

    @Override
    public void deleteCategory(Long id) {
        try {
            // Delete from S3 Bucket.
            fileUploadService.deleteFile(categoryRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found")).getImgUrl());
            categoryRepository.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete category as: " + e.getMessage());
        }
    }

    private CategoryResponse convertToCategoryResponse(CategoryEntity category) {
        return CategoryResponse.builder()
                .category(CategoryDto.builder()
                        .id(category.getId())
                        .name(category.getName())
                        .description(category.getDescription())
                        .bgColor(category.getBgColor())
                        .imgUrl(category.getImgUrl())
                        .build())
                .message("Category fetched successfully")
                .build();
    }

    private CategoryListResponse convertToCategoryListResponse(List<CategoryEntity> categories) {
        // If categories isEmpty or null
        if (categories.isEmpty()) {
            return CategoryListResponse.builder()
                    .categories(List.of())
                    .message("No categories found")
                    .build();
        }

        // Convert to List of Category DTO.
        List<CategoryDto> categoryDtoList = categories.stream()
                .map(category -> CategoryDto.builder()
                        .name(category.getName())
                        .id(category.getId())
                        .description(category.getDescription())
                        .bgColor(category.getBgColor())
                        .imgUrl(category.getImgUrl())
                        .build())
                .collect(Collectors.toList());

        return CategoryListResponse.builder()
                .categories(categoryDtoList)
                .message("Categories fetched successfully")
                .build();
    }
}
