package com.betsoft.kalkulatoradmin.business.steps.definitions.ending;

import com.betsoft.kalkulatoradmin.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def.ProductGroupDef;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;
import java.util.Set;

@RepositoryRestResource
public interface EndingDefRepository extends JpaRepository<EndingDef, Long> {

    Optional<Set<EndingDef>> findByProductGroupDefAndColorDefOrderByIdDesc(ProductGroupDef productGroupDef, ColorDef colorDef);

}
