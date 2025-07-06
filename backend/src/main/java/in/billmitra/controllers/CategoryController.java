package in.billmitra.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.billmitra.dto.CategoryListResponse;
import in.billmitra.dto.CategoryRequest;
import in.billmitra.dto.CategoryResponse;
import in.billmitra.dto.MessageResponse;
import in.billmitra.services.CategoryService;
import jdk.jfr.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/")
    public ResponseEntity<CategoryListResponse> getAllCategories() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAllCategories());
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(CategoryListResponse.builder().categories(List.of()).message(e.getReason()).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CategoryListResponse.builder().categories(List.of()).message("Unable to fetch categories: " + e.getMessage()).build());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getCategory(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(categoryService.getCategoryById(id));
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(CategoryResponse.builder().category(null).message(e.getReason()).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CategoryResponse.builder().category(null).message("Unable to fetch category for the id: " + id).build());
        }
    }

    @PostMapping("/admin/")
    public ResponseEntity<CategoryResponse> createCategory(@RequestPart("category") String category, @RequestPart("file") MultipartFile file) {
        ObjectMapper mapper = new ObjectMapper();
        CategoryRequest request = null;

        try {
            request = mapper.readValue(category, CategoryRequest.class);
            return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.addCategory(request, file));
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(CategoryResponse.builder().category(null).message(e.getReason()).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CategoryResponse.builder().category(null).message("Exception while parsing category: " + e.getMessage()).build());
        }
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<MessageResponse> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Category deleted successfully"));
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(new MessageResponse(e.getReason()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Unable to delete category for id: " + id));
        }
    }
}
