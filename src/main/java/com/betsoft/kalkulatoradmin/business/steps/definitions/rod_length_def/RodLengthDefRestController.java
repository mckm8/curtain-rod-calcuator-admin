package com.betsoft.kalkulatoradmin.business.steps.definitions.rod_length_def;

import com.betsoft.kalkulatoradmin.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.color_def.ColorDefRepository;
import com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def.ProductGroupDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def.ProductGroupDefRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(path = "/rodLengthDefs")
public class RodLengthDefRestController {

    private ColorDefRepository colorDefRepository;
    private ProductGroupDefRepository productGroupDefRepository;
    private RodLengthDefRepository rodLengthDefRepository;

    public RodLengthDefRestController(ColorDefRepository colorDefRepository, ProductGroupDefRepository productGroupDefRepository, RodLengthDefRepository rodLengthDefRepository) {
        this.colorDefRepository = colorDefRepository;
        this.productGroupDefRepository = productGroupDefRepository;
        this.rodLengthDefRepository = rodLengthDefRepository;
    }

    @SuppressWarnings("Duplicates")
    @GetMapping
    @RequestMapping(path = "/byProductGroupIdAndColorId")
    public ResponseEntity getbyProductGroupIdAndColorId(@RequestParam("productgroupid") Long productGroupId, @RequestParam("colorid") Long colorId) {
        Optional<ProductGroupDef> productGroup = productGroupDefRepository.findById(productGroupId);
        Optional<ColorDef> color = colorDefRepository.findById(colorId);
        if (productGroup.isPresent() && color.isPresent()) {
            Optional<Set<RodLengthDef>> byProductGroupDefsAndColorDefs = rodLengthDefRepository.findByProductGroupDefAndColorDefOrderByIdDesc(productGroup.get(), color.get());
            if (byProductGroupDefsAndColorDefs.isPresent()) {
                return ResponseEntity.ok(byProductGroupDefsAndColorDefs.get());
            }
        }
        return ResponseEntity.noContent().build();
    }
}
