package com.betsoft.kalkulatoradmin.config;

import com.betsoft.kalkulatoradmin.business.address_config.AddressConfig;
import com.betsoft.kalkulatoradmin.business.order.SingleOrder;
import com.betsoft.kalkulatoradmin.business.steps.definitions.circle_def.CircleDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.ending.EndingDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.ending_second_rod.EndingSecondRodDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def.ProductGroupDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.rod_length_def.RodLengthDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.support_def.SupportDef;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
class RepositoryConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(
                ProductGroupDef.class,
                ColorDef.class,
                RodLengthDef.class,
                SupportDef.class,
                EndingDef.class,
                EndingSecondRodDef.class,
                CircleDef.class,
                SingleOrder.class,
                AddressConfig.class
        );
    }
}
