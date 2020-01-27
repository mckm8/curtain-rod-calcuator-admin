import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {Circle, Color, Ending, ProductGroup, Rod, Support} from "../../product";
import {HttpClient} from "@angular/common/http";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-order-preview',
  templateUrl: './order-preview.component.html',
  styleUrls: ['./order-preview.component.scss']
})
export class OrderPreviewComponent implements OnInit {

  id: number;
  order: any;

  productGroup: ProductGroup;
  color: Color;
  rodLength: Rod;
  support: Support;
  ending: Ending;
  ending2: Ending;
  circle: Circle;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private http: HttpClient,
              private snackbarService: SnackbarService) {
  }

  ngOnInit() {
    this.id = this.data['id'];
    this.order = this.data['order'];
    this.http.get(this.order._links.productGroupDef.href)
      .subscribe(
        value => this.productGroup = <ProductGroup>value,
          error1 => this.snackbarService.error("Wystąpił błąd podczas pobierania grupy produktów."));
    this.http.get(this.order._links.colorDef.href).subscribe(value => this.color = <Color>value,
      error1 => this.snackbarService.error("Wystąpił błąd podczas pobierania koloru."));
    this.http.get(this.order._links.rodLengthDef.href).subscribe(value => this.rodLength = <Rod>value,
      error1 => this.snackbarService.error("Wystąpił błąd podczas pobierania długości drążka."));
    this.http.get(this.order._links.supportDef.href).subscribe(value => this.support = <Support>value,
      error1 => this.snackbarService.error("Wystąpił błąd podczas pobierania wspornika."));
    this.http.get(this.order._links.endingDef.href).subscribe(value => this.ending = <Ending>value,
      error1 => this.snackbarService.error("Wystąpił błąd podczas pobierania końcówki."));
    this.http.get(this.order._links.endingDef2.href).subscribe(value => this.ending2 = <Ending>value,
      error1 => {
        if (error1.status != 404){
          this.snackbarService.error("Wystąpił błąd podczas pobierania końcówki dla drugiego drążka.")
        }
      });
    this.http.get(this.order._links.circleDef.href).subscribe(value => this.circle = <Circle>value,
      error1 => this.snackbarService.error("Wystąpił błąd podczas pobierania kółka."));
    console.log(this.order);
  }

}

export interface ElementDescription {
  element: string;
  name: string;
  count: number;
  price: number;
}


