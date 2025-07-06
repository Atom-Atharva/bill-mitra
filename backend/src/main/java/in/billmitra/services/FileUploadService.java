package in.billmitra.services;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
    String uploadFile(MultipartFile file);

    void deleteFile(String imgUrl);
}
