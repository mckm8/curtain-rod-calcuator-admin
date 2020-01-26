package com.betsoft.kalkulatoradmin.business.steps.definitions.ending;

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
@RequestMapping(path = "/endingDefs")
public class EndingDefRestController {

    private ColorDefRepository colorDefRepository;
    private ProductGroupDefRepository productGroupDefRepository;
    private EndingDefRepository endingDefRepository;
    private FileService fileService;

    public EndingDefRestController(ColorDefRepository colorDefRepository,
                                   ProductGroupDefRepository productGroupDefRepository,
                                   EndingDefRepository endingDefRepository,
                                   FileService fileService) {
        this.colorDefRepository = colorDefRepository;
        this.productGroupDefRepository = productGroupDefRepository;
        this.endingDefRepository = endingDefRepository;
        this.fileService = fileService;
    }

    @SuppressWarnings("Duplicates")
    @GetMapping
    @RequestMapping(path = "/byProductGroupIdAndColorId")
    public ResponseEntity getbyProductGroupIdAndColorId(@RequestParam("productgroupid") Long productGroupId, @RequestParam("colorid") Long colorId) {
        Optional<ProductGroupDef> productGroup = productGroupDefRepository.findById(productGroupId);
        Optional<ColorDef> color = colorDefRepository.findById(colorId);
        if (productGroup.isPresent() && color.isPresent()) {
            Optional<Set<EndingDef>> byProductGroupDefAndColorDef = endingDefRepository.findByProductGroupDefAndColorDefOrderByIdDesc(productGroup.get(), color.get());
            if (byProductGroupDefAndColorDef.isPresent()) {
                return ResponseEntity.ok(byProductGroupDefAndColorDef.get());
            }
        }
        return ResponseEntity.noContent().build();
    }

    @SuppressWarnings("Duplicates")
    @PostMapping(value = "/{id}/image")
    public ResponseEntity setDane(@RequestParam("file") MultipartFile file, @PathVariable("id") Long id) {
        try {
            fileService.saveFileOnDisk(file);

            endingDefRepository.findById(id).ifPresent(endingDef -> {
                endingDef.setImageUrl(file.getOriginalFilename());
                endingDefRepository.save(endingDef);
            });

            return ResponseEntity.ok().build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
