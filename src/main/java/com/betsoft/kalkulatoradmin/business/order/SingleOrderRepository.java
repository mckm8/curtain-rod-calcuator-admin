package com.betsoft.kalkulatoradmin.business.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface SingleOrderRepository extends JpaRepository<SingleOrder, Long> {
}
