import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductGroupComponent} from "./pages/1product-group/product-group.component";
import {ColorComponent} from "./pages/2color/color.component";
import {RodLengthComponent} from "./pages/3rod-length/rod-length.component";
import {SupportComponent} from "./pages/4support/support.component";
import {EndingComponent} from "./pages/5ending/ending.component";
import {CircleComponent} from "./pages/6circle/circle.component";
import {OrdersComponent} from "./pages/orders/orders.component";
import {AddressConfigComponent} from "./pages/address-config/address-config.component";
import {EndingSecondRodComponent} from "./pages/5ending-second-rod/ending-second-rod.component";

const routes: Routes = [{
  path: '',
  component: ProductGroupComponent
},
  {
    path: 'product-group',
    component: ProductGroupComponent
  }, {
    path: 'color',
    component: ColorComponent
  }, {
    path: 'rod-length',
    component: RodLengthComponent
  },
  {
    path: 'support',
    component: SupportComponent
  },
  {
    path: 'ending',
    component: EndingComponent
  },
  {
    path: 'ending-second-rod',
    component: EndingSecondRodComponent
  },
  {
    path: 'circle',
    component: CircleComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'address-config',
    component: AddressConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],

  exports: [RouterModule]
})
export class AppRoutingModule {
}
