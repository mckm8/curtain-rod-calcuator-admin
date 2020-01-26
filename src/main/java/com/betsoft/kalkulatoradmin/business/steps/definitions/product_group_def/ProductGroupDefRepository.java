package com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface ProductGroupDefRepository extends JpaRepository<ProductGroupDef, Long> {
    Optional<ProductGroupDef> findByName(String name);
}
