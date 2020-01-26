package com.betsoft.kalkulatoradmin.business.steps.definitions.color_def;

import com.betsoft.kalkulatoradmin.business.steps.definitions.ending.EndingDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def.ProductGroupDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.support_def.SupportDef;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.Collections;
import java.util.Set;

@Getter
@Setter
@Entity
@Audited
public class ColorDef {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String imageUrl;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JoinTable(
            name = "color_def_product_group",
            joinColumns = @JoinColumn(name = "color_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "product_group_id", referencedColumnName = "id")
    )
    private Set<ProductGroupDef> productGroupDefs;

    @JsonIgnore
    @OneToMany(mappedBy = "colorDef", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<SupportDef> supportDefs = Collections.emptySet();

    @JsonIgnore
    @OneToMany(mappedBy = "colorDef", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<EndingDef> endingDefs = Collections.emptySet();

}
