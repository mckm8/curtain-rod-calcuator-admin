package com.betsoft.kalkulatoradmin.business.images;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

@Component
public class FileService {

    @Value("${image.folder}")
    private String imagePath;

    public void saveFileOnDisk(MultipartFile file) throws IOException {
        File file1 = new File(imagePath + File.separator + file.getOriginalFilename());
        file.transferTo(file1);
    }
}
