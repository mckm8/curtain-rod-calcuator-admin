package com.betsoft.kalkulatoradmin.business.steps.definitions.rod_def;


import com.betsoft.kalkulatoradmin.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def.ProductGroupDef;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@ToString
@Audited
public class RodDef {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer price;

    @OneToMany
    private Set<ColorDef> colorDefs;

    @OneToMany
    private Set<ProductGroupDef> productGroupDefs;
}
