package in.billmitra.services.impl;

import in.billmitra.dto.ItemDto;
import in.billmitra.dto.ItemListResponse;
import in.billmitra.dto.ItemRequest;
import in.billmitra.dto.ItemResponse;
import in.billmitra.entities.CategoryEntity;
import in.billmitra.entities.ItemEntity;
import in.billmitra.repositories.CategoryRepository;
import in.billmitra.repositories.ItemRepository;
import in.billmitra.security.CustomUserDetails;
import in.billmitra.services.FileUploadService;
import in.billmitra.services.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {
    private final FileUploadService fileUploadService;
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;

    @Override
    public ItemResponse addItem(ItemRequest request, MultipartFile file) {
        // Check for existing item.
        Optional<ItemEntity> existingItem = itemRepository.findByCategory_idAndName(request.getCategoryId(),request.getName());
        if (existingItem.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Item already exists");
        }

        // Get Category
        CategoryEntity category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Category not found"));

        // Create Entity
        ItemEntity item = ItemEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .imgUrl(null)
                .bgColor(request.getBgColor())
                .category(category)
                .store(category.getStore())
                .build();

        // Upload Img to S3 Bucket
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

        // Set Image Url
        item.setImgUrl(imgUrl);

        try {
            item = itemRepository.save(item);
        } catch (Exception e) {
            e.printStackTrace();
            try {
                fileUploadService.deleteFile(imgUrl);
            } catch (ResponseStatusException ex) {
                ex.printStackTrace();
            }
        }

        ItemResponse response= convertToItemResponse(item);
        response.setMessage("Item added successfully");
        return response;
    }

    @Override
    public ItemResponse getItemById(Long id) {
        // Get Item
        ItemEntity item = itemRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        // Convert and Return
        return convertToItemResponse(item);
    }


    @Override
    public ItemListResponse getAllItems(Long categoryId) {
        // If categoryId is empty
        if (categoryId == null) {
            // fetch items by storeId
            CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Long storeId = userDetails.getStoreId();

            if(itemRepository.findAllByStore_id(storeId).isEmpty()){
                return ItemListResponse.builder()
                        .items(List.of())
                        .message("No Items found")
                        .build();
            }

            return convertToItemListResponse(itemRepository.findAllByStore_id(storeId));
        }

        // If a category doesn't exist in store
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found in store.");
        }

        // If no Items
        if (itemRepository.findAllByCategory_id(categoryId).isEmpty()) {
            return ItemListResponse.builder()
                    .items(List.of())
                    .message("No Items found")
                    .build();
        }

        // Get List of Items
        List<ItemEntity> items = itemRepository.findAllByCategory_id(categoryId);

        // Convert to List Response
        return convertToItemListResponse(items);
    }

    @Override
    public void deleteItem(Long id) {
        try{
            fileUploadService.deleteFile(itemRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found")).getImgUrl());
            itemRepository.deleteById(id);
        }catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete item as: " + e.getMessage());
        }
    }

    private ItemListResponse convertToItemListResponse(List<ItemEntity> items) {
        return ItemListResponse.builder()
                .items(items.stream()
                        .map(this::converToItemDto)
                        .toList())
                .message("Items fetched Successfully")
                .build();
    }

    private ItemResponse convertToItemResponse(ItemEntity item) {
        return ItemResponse.builder()
                .item(converToItemDto(item))
                .message("Item fetched Successfully")
                .build();
    }

    private ItemDto converToItemDto(ItemEntity item) {
        return ItemDto.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .imgUrl(item.getImgUrl())
                .price(item.getPrice())
                .bgColor(item.getBgColor())
                .categoryName(item.getCategory().getName())
                .build();
    }
}
