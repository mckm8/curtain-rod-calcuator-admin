import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from "./material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ProductGroupComponent } from './pages/1product-group/product-group.component';
import { ColorComponent } from './pages/2color/color.component';
import { HomeComponent } from './pages/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogComponent} from "./material/confirm-dialog/confirm-dialog.component";
import {NgxUploaderModule} from "ngx-uploader";
import { RodLengthComponent } from './pages/3rod-length/rod-length.component';
import { PgColorComponent } from './pages/pg-color/pg-color.component';
import { SupportComponent } from './pages/4support/support.component';
import { EndingComponent } from './pages/5ending/ending.component';
import { CircleComponent } from './pages/6circle/circle.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderPreviewComponent } from './pages/orders/order-preview/order-preview.component';
import { AddressConfigComponent } from './pages/address-config/address-config.component';
import { EndingSecondRodComponent } from './pages/5ending-second-rod/ending-second-rod.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductGroupComponent,
    ColorComponent,
    HomeComponent,
    ConfirmDialogComponent,
    RodLengthComponent,
    PgColorComponent,
    SupportComponent,
    EndingComponent,
    CircleComponent,
    OrdersComponent,
    OrderPreviewComponent,
    AddressConfigComponent,
    EndingSecondRodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    FormsModule
  ],
  entryComponents: [
    ConfirmDialogComponent,
    OrderPreviewComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
