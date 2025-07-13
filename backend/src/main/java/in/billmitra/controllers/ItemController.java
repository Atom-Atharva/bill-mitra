package in.billmitra.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.billmitra.dto.*;
import in.billmitra.services.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/items")
public class ItemController {
    private final ItemService itemService;

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponse> getItemById(@PathVariable Long id) {
        try {
            ItemResponse item = itemService.getItemById(id);
            return ResponseEntity.ok(item);
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(ItemResponse.builder().item(null).message(e.getReason()).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ItemResponse.builder().item(null).message(e.getMessage()).build());
        }
    }

    @GetMapping("/")
    public ResponseEntity<ItemListResponse> getAllItems(@RequestParam Long categoryId) {
        try {
            ItemListResponse response = itemService.getAllItems(categoryId);
            return ResponseEntity.ok(response);
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(ItemListResponse.builder().items(List.of()).message(e.getReason()).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ItemListResponse.builder().items(List.of()).message(e.getMessage()).build());
        }
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<MessageResponse> deleteItem(@PathVariable Long id) {
        try {
            itemService.deleteItem(id);
            return ResponseEntity.ok(new MessageResponse("Item deleted successfully"));
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(new MessageResponse(e.getReason()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping("/admin")
    public ResponseEntity<ItemResponse> addItem(@RequestPart("item") String item, @RequestPart("file") MultipartFile file) {
        ObjectMapper mapper = new ObjectMapper();
        ItemRequest request = null;

        try {
            request = mapper.readValue(item, ItemRequest.class);
            return ResponseEntity.status(HttpStatus.CREATED).body(itemService.addItem(request, file));
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(ItemResponse.builder().item(null).message(e.getReason()).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ItemResponse.builder().item(null).message("Exception while parsing category: " + e.getMessage()).build());
        }
    }
}
