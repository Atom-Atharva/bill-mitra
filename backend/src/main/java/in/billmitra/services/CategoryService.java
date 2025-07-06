package in.billmitra.services;

import in.billmitra.dto.CategoryListResponse;
import in.billmitra.dto.CategoryRequest;
import in.billmitra.dto.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

public interface CategoryService {
    CategoryResponse addCategory(CategoryRequest request, MultipartFile file);

    CategoryListResponse getAllCategories();

    CategoryResponse getCategoryById(Long id);

    void deleteCategory(Long id);
}
