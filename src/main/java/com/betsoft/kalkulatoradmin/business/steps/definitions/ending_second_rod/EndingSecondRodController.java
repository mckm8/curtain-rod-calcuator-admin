package com.betsoft.kalkulatoradmin.business.steps.definitions.ending_second_rod;

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
@RequestMapping(path = "/endingSecondRodDefs")
public class EndingSecondRodController {

    private ColorDefRepository colorDefRepository;
    private ProductGroupDefRepository productGroupDefRepository;
    private EndingSecondRodRepository endingSecondRodRepository;
    private FileService fileService;

    public EndingSecondRodController(ColorDefRepository colorDefRepository,
                                     ProductGroupDefRepository productGroupDefRepository,
                                     EndingSecondRodRepository endingSecondRodRepository,
                                     FileService fileService) {
        this.colorDefRepository = colorDefRepository;
        this.productGroupDefRepository = productGroupDefRepository;
        this.endingSecondRodRepository = endingSecondRodRepository;
        this.fileService = fileService;
    }

    @SuppressWarnings("Duplicates")
    @GetMapping
    @RequestMapping(path = "/byProductGroupIdAndColorId")
    public ResponseEntity getbyProductGroupIdAndColorId(@RequestParam("productgroupid") Long productGroupId, @RequestParam("colorid") Long colorId) {
        Optional<ProductGroupDef> productGroup = productGroupDefRepository.findById(productGroupId);
        Optional<ColorDef> color = colorDefRepository.findById(colorId);
        if (productGroup.isPresent() && color.isPresent()) {
            Optional<Set<EndingSecondRodDef>> byProductGroupDefAndColorDef = endingSecondRodRepository.findByProductGroupDefAndColorDefOrderByIdDesc(productGroup.get(), color.get());
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

            endingSecondRodRepository.findById(id).ifPresent(endingDef -> {
                endingDef.setImageUrl(file.getOriginalFilename());
                endingSecondRodRepository.save(endingDef);
            });

            return ResponseEntity.ok().build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}


