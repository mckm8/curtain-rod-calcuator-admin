package com.betsoft.kalkulatoradmin.business.steps.definitions.support_def;

import com.betsoft.kalkulatoradmin.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def.ProductGroupDef;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.envers.Audited;

import javax.persistence.*;

@Getter
@Setter
@Entity
@ToString
@Audited
public class SupportDef {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    private String imageUrl;

    @ManyToOne(targetEntity = ColorDef.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "COLOR_ID")
    @JsonIgnore
    private ColorDef colorDef;

    @ManyToOne(targetEntity = ProductGroupDef.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "PRODUCT_GROUP_ID")
    @JsonIgnore
    private ProductGroupDef productGroupDef;

}
