package com.betsoft.kalkulatoradmin.business.steps.definitions.rod_length_def;

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
public class RodLengthDef {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double length;

    private String imageUrl;

    private Double price;

    @ManyToOne(targetEntity = ColorDef.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "COLOR_ID")
    @JsonIgnore
    private ColorDef colorDef;

    @ManyToOne(targetEntity = ProductGroupDef.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "PRODUCT_GROUP_ID")
    @JsonIgnore
    private ProductGroupDef productGroupDef;

}
