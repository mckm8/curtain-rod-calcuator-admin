import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestService} from "../../services/rest.service";
import {Color, ProductGroup} from "../product";
import {map} from "rxjs/operators";
import {MatSelectChange} from "@angular/material";
import {UploadInput} from "ngx-uploader";

@Component({
  selector: 'app-pg-color',
  templateUrl: './pg-color.component.html',
  styleUrls: ['./pg-color.component.scss']
})
export class PgColorComponent implements OnInit {

  isSelected = false;
  allProductGroups: ProductGroup[];
  selectedProductGroup: ProductGroup;
  allColors: Color[];
  selectedColor: Color;

  @Output()
  pgChanged: EventEmitter<ProductGroup> = new EventEmitter();
  @Output()
  colorChanged: EventEmitter<Color> = new EventEmitter();

  constructor(private restService: RestService) { }

  ngOnInit() {
      this.restService.getAllProductGroups().pipe(map((response: any) => {
        return response._embedded.productGroupDefs;
      })).subscribe(value => {
        this.allProductGroups = value;
      });
    this.restService.getAllColors().pipe(map((response: any) => {
      return response._embedded.colorDefs;
    })).subscribe(value => {
      this.allColors = value;
    })
  }

  pgSelectionChanged($event: MatSelectChange) {
    this.pgChanged.emit(this.selectedProductGroup);
  }


  colorSelectionChanged($event: MatSelectChange) {
    this.colorChanged.emit(this.selectedColor);
  }
}
