import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Color, ProductGroup, Rod, Support} from "../pages/product";
import {AddressConfig} from "../pages/address-config/address-config";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  updatenNameForParameter(id: number, newName: string, parametersNameInPlural) {
    return this.http.patch("/kalkulator-admin/" + parametersNameInPlural + "/" + id, {name: newName});
  }

  updatePriceForParameter(id: number, newPrice: number, parametersNameInPlural) {
    return this.http.patch("/kalkulator-admin/" + parametersNameInPlural + "/" + id, {price: newPrice});
  }

  getAllProductGroups() {
    return this.http.get("/kalkulator-admin/productGroupDefs?sort=id,desc");
  }

  addProductGroup(productGroup: ProductGroup) {
    return this.http.post("/kalkulator-admin/productGroupDefs", productGroup);
  }

  deleteProductGroup(id: number) {
    return this.http.delete("/kalkulator-admin/productGroupDefs/" + id);
  }

  updateProductGroupName(id: number, newName: string) {
    return this.http.patch("/kalkulator-admin/productGroupDefs/" + id, {name: newName});
  }

  getAllColors() {
    return this.http.get("/kalkulator-admin/colorDefs?sort=id,desc");
  }

  addColor(color: Color) {
    return this.http.post("/kalkulator-admin/colorDefs", color);
  }

  deleteColor(id: number) {
    return this.http.delete("/kalkulator-admin/colorDefs/" + id);
  }

  getProductGroupsForColor(id: number) {
    return this.http.get("/kalkulator-admin/colorDefs/" + id + "/productGroupDefs");
  }

  setProductGroupsForColor(idColor: number, productGroupUrls: string[]) {
    return this.http.put("/kalkulator-admin/colorDefs/" + idColor + "/productGroupDefs",
      productGroupUrls.join("\n"), {headers: {'Content-Type': 'text/uri-list'}});
  }

  getAllRodLengths() {
    return this.http.get("/kalkulator-admin/rodLengthDefs" + "?sort=id,desc");
  }

  getRodLengthsByProductGroupIdAndColorId(productGroupId: number, colorId: number) {
    return this.http.get("/kalkulator-admin/rodLengthDefs/byProductGroupIdAndColorId?productgroupid=" + productGroupId + "&colorid=" + colorId);
  }

  deleteRodLength(id: number) {
    return this.http.delete("/kalkulator-admin/rodLengthDefs/" + id);
  }

  addRodLength(rod: Rod) {
    return this.http.post("/kalkulator-admin/rodLengthDefs", rod);
  }

  setProductGroupForRodLength(idRodLength: number, productGroupId: number) {
    return this.http.put("/kalkulator-admin/rodLengthDefs/" + idRodLength + "/productGroupDef",
      "http://localhost:8080/kalkulator-admin/productGroupDefs/" + productGroupId, {headers: {'Content-Type': 'text/uri-list'}});
  }

  setColorForRodLength(idRodLength: number, colorId: number) {
    return this.http.put("/kalkulator-admin/rodLengthDefs/" + idRodLength + "/colorDef",
      "http://localhost:8080/kalkulator-admin/colorDefs/" + colorId, {headers: {'Content-Type': 'text/uri-list'}});
  }

  // __________________________________________

  getSupportsByProductGroupIdAndColorId(productGroupId: number, colorId: number) {
    return this.http.get("/kalkulator-admin/supportDefs/byProductGroupIdAndColorId?productgroupid=" + productGroupId + "&colorid=" + colorId);
  }

  deleteSupport(id: number) {
    return this.http.delete("/kalkulator-admin/supportDefs/" + id);
  }

  addSupport(support: Support) {
    return this.http.post("/kalkulator-admin/supportDefs", support);
  }

  setProductGroupForSupport(idSupport: number, productGroupId: number) {
    return this.http.put("/kalkulator-admin/supportDefs/" + idSupport + "/productGroupDef",
      "http://localhost:8080/kalkulator-admin/productGroupDefs/" + productGroupId, {headers: {'Content-Type': 'text/uri-list'}});
  }

  setColorForSupport(idSupport: number, colorId: number) {
    return this.http.put("/kalkulator-admin/supportDefs/" + idSupport + "/colorDef",
      "http://localhost:8080/kalkulator-admin/colorDefs/" + colorId, {headers: {'Content-Type': 'text/uri-list'}});
  }

  // __________________________________________

  getEndingsByProductGroupIdAndColorId(productGroupId: number, colorId: number) {
    return this.http.get("/kalkulator-admin/endingDefs/byProductGroupIdAndColorId?productgroupid=" + productGroupId + "&colorid=" + colorId);
  }

  deleteEnding(id: number) {
    return this.http.delete("/kalkulator-admin/endingDefs/" + id);
  }

  addEnding(support: Support) {
    return this.http.post("/kalkulator-admin/endingDefs", support);
  }

  setProductGroupForEnding(idEnding: number, productGroupId: number) {
    return this.http.put("/kalkulator-admin/endingDefs/" + idEnding + "/productGroupDef",
      "http://localhost:8080/kalkulator-admin/productGroupDefs/" + productGroupId, {headers: {'Content-Type': 'text/uri-list'}});
  }

  setColorForEnding(idEnding: number, colorId: number) {
    return this.http.put("/kalkulator-admin/endingDefs/" + idEnding + "/colorDef",
      "http://localhost:8080/kalkulator-admin/colorDefs/" + colorId, {headers: {'Content-Type': 'text/uri-list'}});
  }

  // __________________________________________

  getEndingSecondRodsByProductGroupIdAndColorId(productGroupId: number, colorId: number) {
    return this.http.get("/kalkulator-admin/endingSecondRodDefs/byProductGroupIdAndColorId?productgroupid=" + productGroupId + "&colorid=" + colorId);
  }

  deleteEndingSecondRod(id: number) {
    return this.http.delete("/kalkulator-admin/endingSecondRodDefs/" + id);
  }

  addEndingSecondRod(support: Support) {
    return this.http.post("/kalkulator-admin/endingSecondRodDefs", support);
  }

  setProductGroupForEndingSecondRod(idEnding: number, productGroupId: number) {
    return this.http.put("/kalkulator-admin/endingSecondRodDefs/" + idEnding + "/productGroupDef",
      "http://localhost:8080/kalkulator-admin/productGroupDefs/" + productGroupId, {headers: {'Content-Type': 'text/uri-list'}});
  }

  setColorForEndingSecondRod(idEnding: number, colorId: number) {
    return this.http.put("/kalkulator-admin/endingSecondRodDefs/" + idEnding + "/colorDef",
      "http://localhost:8080/kalkulator-admin/colorDefs/" + colorId, {headers: {'Content-Type': 'text/uri-list'}});
  }

  // __________________________________________
  getCirclesByProductGroupIdAndColorId(productGroupId: number, colorId: number) {
    return this.http.get("/kalkulator-admin/circleDefs/byProductGroupIdAndColorId?productgroupid=" + productGroupId + "&colorid=" + colorId);
  }

  deleteCircle(id: number) {
    return this.http.delete("/kalkulator-admin/circleDefs/" + id);
  }

  addCircle(support: Support) {
    return this.http.post("/kalkulator-admin/circleDefs", support);
  }

  setProductGroupForCircle(idCircle: number, productGroupId: number) {
    return this.http.put("/kalkulator-admin/circleDefs/" + idCircle + "/productGroupDef",
      "http://localhost:8080/kalkulator-admin/productGroupDefs/" + productGroupId, {headers: {'Content-Type': 'text/uri-list'}});
  }

  setColorForCircle(idCircle: number, colorId: number) {
    return this.http.put("/kalkulator-admin/circleDefs/" + idCircle + "/colorDef",
      "http://localhost:8080/kalkulator-admin/colorDefs/" + colorId, {headers: {'Content-Type': 'text/uri-list'}});
  }

  //___________________________________
  getAllOrders() {
    return this.http.get("/kalkulator-admin/singleOrders?sort=id,desc");
  }

  deleteOrder(id: number) {
    return this.http.delete("/kalkulator-admin/singleOrders/" + id);
  }

  updateStatusForOrder(id: number, status: string) {
    return this.http.patch("/kalkulator-admin/singleOrders/" + id, {'status': status});
  }

  //_____________________________________
  findAllAddresses(){
    return this.http.get("/kalkulator-admin/addressConfigs");
  }

  addAddress(addresConfig: AddressConfig){
    return this.http.post("/kalkulator-admin/addressConfigs", addresConfig);
  }

  deleteAddressById(id: number){
    return this.http.delete("/kalkulator-admin/addressConfigs/" + id);
  }
}
