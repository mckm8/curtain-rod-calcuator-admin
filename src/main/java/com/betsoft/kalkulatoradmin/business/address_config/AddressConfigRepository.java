package com.betsoft.kalkulatoradmin.business.address_config;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AddressConfigRepository extends JpaRepository<AddressConfig, Long> {
}
