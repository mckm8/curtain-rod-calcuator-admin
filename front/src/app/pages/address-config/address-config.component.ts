import {Component, OnInit} from '@angular/core';
import {RestService} from "../../services/rest.service";
import {AddressConfig} from "./address-config";
import {LoaderService} from "../../services/loader.service";
import {SnackbarService} from "../../services/snackbar.service";
import {ConfirmDialogComponent} from "../../material/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-address-config',
  templateUrl: './address-config.component.html',
  styleUrls: ['./address-config.component.scss']
})
export class AddressConfigComponent implements OnInit {

  displayedColumns: string[] = ['id', 'redirectUrl', 'price', 'delete'];
  allAddresses;

  newAddress: string;
  newPrice: number;

  constructor(private restService: RestService,
              private dialog: MatDialog,
              private loaderService: LoaderService,
              private snackbarService: SnackbarService) {
  }

  ngOnInit() {
    this.refreshTable();

    // var ac: AddressConfig = new AddressConfig();
    // ac.pricePerElement = 5;
    // ac.redirectUrl = 'http://AAAa.pl';
    //
    // this.restService.addAddress(ac).subscribe(value => {
    //   console.log(value);
    // })
  }

  private refreshTable() {
    this.loaderService.startLoader("Proszę czekać");
    this.restService.findAllAddresses().subscribe(value => {
      this.allAddresses = (<any>value)._embedded.addressConfigs;
      this.loaderService.stopLoader();
    }, error => {
      this.loaderService.stopLoader();
      this.snackbarService.error("Wystąpił błąd.")
    })
  }

  add() {
    let ac: AddressConfig = new AddressConfig();
    ac.pricePerElement = this.newPrice;
    ac.redirectUrl = this.newAddress;

    this.loaderService.startLoader("Proszę czekać")
    this.restService.addAddress(ac).subscribe(value => {
      this.refreshTable();
      this.loaderService.stopLoader();
    }, error => {
      this.snackbarService.error("Wystąpił błąd.")
      this.loaderService.stopLoader();
    })
  }

  onClickDeleteAction(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Usuwanie adresu',
        header: 'Czy napewno chcesz wpis z adresem?',
        confirmName: 'Usuń'
      }
    });
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.loaderService.startLoader("Trwa wczytywanie")
        this.restService.deleteAddressById(id).subscribe(value => {
          this.refreshTable();
        }, error1 => {
          this.snackbarService.error("Wystąpił błąd.")
          this.loaderService.stopLoader();
        });
      }
    });
  }
}
