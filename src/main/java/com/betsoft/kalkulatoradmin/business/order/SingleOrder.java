package com.betsoft.kalkulatoradmin.business.order;

import com.betsoft.kalkulatoradmin.business.steps.definitions.circle_def.CircleDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.ending.EndingDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.ending_second_rod.EndingSecondRodDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.product_group_def.ProductGroupDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.rod_length_def.RodLengthDef;
import com.betsoft.kalkulatoradmin.business.steps.definitions.support_def.SupportDef;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@ToString
@Audited
public class SingleOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date data = new Date();

    private String email;
    private String phoneNumber;
    private String allegroNick;
    private String additionalInformations;
    private Status status;
    private String redirectUrl;
    private double pricePerElement;

    @ManyToOne
    @JoinColumn
    private RodLengthDef rodLengthDef;
    private Long rodCount;

    @ManyToOne
    @JoinColumn
    private ProductGroupDef productGroupDef;

    @ManyToOne
    @JoinColumn
    private ColorDef colorDef;

    @ManyToOne
    @JoinColumn
    private SupportDef supportDef;
    private Long supportCount;

    @ManyToOne
    @JoinColumn
    private EndingDef endingDef;
    private Long endingCount;

    @ManyToOne
    @JoinColumn
    private EndingSecondRodDef endingDef2;
    private Long ending2Count;

    @ManyToOne
    @JoinColumn
    private CircleDef circleDef;
    private Long circleCount;
}
