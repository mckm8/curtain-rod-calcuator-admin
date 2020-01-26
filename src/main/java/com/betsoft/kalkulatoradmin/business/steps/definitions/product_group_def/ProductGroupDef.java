package com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def;

import com.betsoft.kalkulatoradmin.business.steps.definitions.circle_def.CircleDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.ending.EndingDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.support_def.SupportDef;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.Collections;
import java.util.Set;

@Getter
@Setter
@Entity
@ToString
@Audited
public class ProductGroupDef {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String url;

    @ManyToMany(cascade = CascadeType.REMOVE, mappedBy = "productGroupDefs", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<ColorDef> colorDefs;

    @OneToMany(mappedBy = "productGroupDef", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<SupportDef> supportDefs = Collections.emptySet();

    @JsonIgnore
    @OneToMany(mappedBy = "productGroupDef", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<EndingDef> endingDefs = Collections.emptySet();

    @JsonIgnore
    @OneToMany(mappedBy = "productGroupDef", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<CircleDef> circleDefs = Collections.emptySet();

}
