package in.billmitra.services;

import in.billmitra.dto.ItemListResponse;
import in.billmitra.dto.ItemRequest;
import in.billmitra.dto.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ItemService {
    ItemResponse addItem(ItemRequest request, MultipartFile file);
    ItemResponse getItemById(Long id);
    ItemListResponse getAllItems(Long categoryId);
    void deleteItem(Long id);
}
