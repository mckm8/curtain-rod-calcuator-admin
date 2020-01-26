package com.betsoft.kalkulatoradmin.business.steps.definitions.rod_def;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface RodDefRepository extends JpaRepository<RodDef, Long> {
}
