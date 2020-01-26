package com.betsoft.kalkulatoradmin.business.steps.definitions.color_def;

import com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def.ProductGroupDef;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Set;

@RepositoryRestResource
public interface ColorDefRepository extends JpaRepository<ColorDef, Long> {

    Set<ColorDef> findByProductGroupDefsOrderByIdDesc(Set<ProductGroupDef> productGroupDefSet);

}
