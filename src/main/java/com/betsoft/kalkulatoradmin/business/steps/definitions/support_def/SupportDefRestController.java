package com.betsoft.kalkulatoradmin.business.steps.definitions.support_def;

import com.betsoft.kalkulatoradmin.business.images.FileService;
import com.betsoft.kalkulatoradmin.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.color_def.ColorDefRepository;
import com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def.ProductGroupDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def.ProductGroupDefRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(path = "/supportDefs")
public class SupportDefRestController {

    private ColorDefRepository colorDefRepository;
    private ProductGroupDefRepository productGroupDefRepository;
    private SupportDefRepository supportDefRepository;
    private FileService fileService;

    public SupportDefRestController(ColorDefRepository colorDefRepository,
                                    ProductGroupDefRepository productGroupDefRepository,
                                    SupportDefRepository supportDefRepository,
                                    FileService fileService) {
        this.colorDefRepository = colorDefRepository;
        this.productGroupDefRepository = productGroupDefRepository;
        this.supportDefRepository = supportDefRepository;
        this.fileService = fileService;
    }

    @SuppressWarnings("Duplicates")
    @GetMapping
    @RequestMapping(path = "/byProductGroupIdAndColorId")
    public ResponseEntity getbyProductGroupIdAndColorId(@RequestParam("productgroupid") Long productGroupId, @RequestParam("colorid") Long colorId) {
        Optional<ProductGroupDef> productGroup = productGroupDefRepository.findById(productGroupId);
        Optional<ColorDef> color = colorDefRepository.findById(colorId);
        if (productGroup.isPresent() && color.isPresent()) {
            Optional<Set<SupportDef>> byProductGroupDefsAndColorDefs = supportDefRepository.findByProductGroupDefAndColorDefOrderByIdDesc(productGroup.get(), color.get());
            if (byProductGroupDefsAndColorDefs.isPresent()) {
                return ResponseEntity.ok(byProductGroupDefsAndColorDefs.get());
            }
        }
        return ResponseEntity.noContent().build();
    }

    @SuppressWarnings("Duplicates")
    @PostMapping(value = "/{id}/image")
    public ResponseEntity setDane(@RequestParam("file") MultipartFile file, @PathVariable("id") Long id) {
        try {
            fileService.saveFileOnDisk(file);

            supportDefRepository.findById(id).ifPresent(supportDef -> {
                supportDef.setImageUrl(file.getOriginalFilename());
                supportDefRepository.save(supportDef);
            });

            return ResponseEntity.ok().build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
