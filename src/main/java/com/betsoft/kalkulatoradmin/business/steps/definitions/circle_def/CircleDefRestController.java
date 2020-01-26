package com.betsoft.kalkulatoradmin.business.steps.definitions.circle_def;

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
@RequestMapping(path = "/circleDefs")
public class CircleDefRestController {

    private ColorDefRepository colorDefRepository;
    private ProductGroupDefRepository productGroupDefRepository;
    private CircleDefRepository circleDefRepository;
    private FileService fileService;

    public CircleDefRestController(ColorDefRepository colorDefRepository,
                                   ProductGroupDefRepository productGroupDefRepository,
                                   CircleDefRepository circleDefRepository,
                                   FileService fileService) {
        this.colorDefRepository = colorDefRepository;
        this.productGroupDefRepository = productGroupDefRepository;
        this.circleDefRepository = circleDefRepository;
        this.fileService = fileService;
    }

    @SuppressWarnings("Duplicates")
    @GetMapping
    @RequestMapping(path = "/byProductGroupIdAndColorId")
    public ResponseEntity getbyProductGroupIdAndColorId(@RequestParam("productgroupid") Long productGroupId, @RequestParam("colorid") Long colorId) {
        Optional<ProductGroupDef> productGroup = productGroupDefRepository.findById(productGroupId);
        Optional<ColorDef> color = colorDefRepository.findById(colorId);
        if (productGroup.isPresent() && color.isPresent()) {
            Optional<Set<CircleDef>> byProductGroupDefsAndColorDefs = circleDefRepository.findByProductGroupDefAndColorDefOrderByIdDesc(productGroup.get(), color.get());
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

            circleDefRepository.findById(id).ifPresent(circleDef -> {
                circleDef.setImageUrl(file.getOriginalFilename());
                circleDefRepository.save(circleDef);
            });
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
