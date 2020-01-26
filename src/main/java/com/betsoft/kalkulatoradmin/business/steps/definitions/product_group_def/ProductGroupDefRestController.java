package com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def;

import com.betsoft.kalkulatoradmin.business.images.FileService;
import com.betsoft.kalkulatoradmin.business.steps.definitions.color_def.ColorDefRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(path = "/productGroupDefs")
public class ProductGroupDefRestController {

    private ColorDefRepository colorDefRepository;
    private ProductGroupDefRepository productGroupDefRepository;
    private FileService fileService;

    public ProductGroupDefRestController(ColorDefRepository colorDefRepository,
                                         ProductGroupDefRepository productGroupDefRepository,
                                         FileService fileService) {
        this.colorDefRepository = colorDefRepository;
        this.productGroupDefRepository = productGroupDefRepository;
        this.fileService = fileService;
    }

    @PostMapping(value = "/{id}/image")
    public ResponseEntity setDane(@RequestParam("file") MultipartFile file, @PathVariable("id") Long id) {
        try {
            fileService.saveFileOnDisk(file);

            productGroupDefRepository.findById(id).ifPresent(productGroupDef -> {
                productGroupDef.setUrl(file.getOriginalFilename());
                productGroupDefRepository.save(productGroupDef);
            });

            return ResponseEntity.ok().build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
