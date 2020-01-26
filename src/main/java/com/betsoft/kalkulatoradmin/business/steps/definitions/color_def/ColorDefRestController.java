package com.betsoft.kalkulatoradmin.business.steps.definitions.color_def;

import com.betsoft.kalkulatoradmin.business.images.FileService;
import com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def.ProductGroupDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def.ProductGroupDefRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(path = "/colorDefs")
public class ColorDefRestController {

    private ColorDefRepository colorDefRepository;
    private ProductGroupDefRepository productGroupDefRepository;
    private FileService fileService;

    public ColorDefRestController(ColorDefRepository colorDefRepository,
                                         ProductGroupDefRepository productGroupDefRepository,
                                         FileService fileService) {
        this.colorDefRepository = colorDefRepository;
        this.productGroupDefRepository = productGroupDefRepository;
        this.fileService = fileService;
    }

    @GetMapping
    @RequestMapping(path = "/byProductGroupName")
    public ResponseEntity getByProductGroup(@RequestParam("productgroupname") String name) {
        if (Objects.nonNull(name)) {
            Optional<ProductGroupDef> byId = productGroupDefRepository.findByName(name);
            if (byId.isPresent()) {
                Set<ColorDef> byProductGroupDefs = colorDefRepository.findByProductGroupDefsOrderByIdDesc(Collections.singleton(byId.get()));
                return ResponseEntity.ok(byProductGroupDefs);
            }
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @RequestMapping(path = "/byProductGroupId")
    public ResponseEntity getByProductGroupId(@RequestParam("productgroupid") Long id) {
        if (Objects.nonNull(id)) {
            Optional<ProductGroupDef> byId = productGroupDefRepository.findById(id);
            if (byId.isPresent()) {
                Set<ColorDef> byProductGroupDefs = colorDefRepository.findByProductGroupDefsOrderByIdDesc(Collections.singleton(byId.get()));
                return ResponseEntity.ok(byProductGroupDefs);
            }
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/{id}/image")
    public ResponseEntity setDane(@RequestParam("file") MultipartFile file, @PathVariable("id") Long id) {
        try {
            fileService.saveFileOnDisk(file);

            colorDefRepository.findById(id).ifPresent(color -> {
                color.setImageUrl(file.getOriginalFilename());
                colorDefRepository.save(color);
            });

            return ResponseEntity.ok().build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}

