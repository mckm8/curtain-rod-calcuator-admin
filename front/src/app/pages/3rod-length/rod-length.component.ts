import {Component, OnInit} from '@angular/core';
import {Color, ProductGroup, Rod} from "../product";
import {RestService} from "../../services/rest.service";
import {ConfirmDialogComponent} from "../../material/confirm-dialog/confirm-dialog.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {LoaderService} from "../../services/loader.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-rod-length',
  templateUrl: './rod-length.component.html',
  styleUrls: ['./rod-length.component.scss']
})
export class RodLengthComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'delete'];
  allRodLengths;
  selectedProductGroup: ProductGroup;
  selectedColor: Color;

  newLength = '130';
  newPrice = 10;

  constructor(private restService: RestService,
              private dialog: MatDialog,
              private loaderService: LoaderService,
              private snackBar: MatSnackBar,
              private snackbarService: SnackbarService) {
  }

  ngOnInit() {
  }

  onColorChanged(color: Color) {
    this.selectedColor = color;
    if (this.selectedProductGroup) {
      this.refreshTable(this.selectedProductGroup.id, this.selectedColor.id);
    }
  }

  onPgChanged(productGroup: ProductGroup) {
    this.selectedProductGroup = productGroup;
    if (this.selectedColor) {
      this.refreshTable(this.selectedProductGroup.id, this.selectedColor.id);
    }
    this.selectedProductGroup = productGroup;
  }

  onClickDeleteAction(itemId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Usuwanie długości drążka',
        header: 'Czy napewno chcesz wpis z długością drążka?',
        confirmName: 'Usuń'
      }
    });
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.loaderService.startLoader("Trwa wczytywanie")
        this.restService.deleteRodLength(itemId).subscribe(value => {
          this.refreshTable(this.selectedProductGroup.id, this.selectedColor.id);
        }, error1 => {
          if(error1.status === 409){
            this.snackbarService.error("Nie można usunąć elementu, ponieważ został on już przypisany do jednego z zamówień. " +
              "Aby usunąć element najpierw należy usunąć wszystkie zamówienia z tym elementem.")
          } else {
            this.snackbarService.error("Wystąpił błąd podczas usuwania.");
          }
          this.loaderService.stopLoader();
        });
      }
    });
  }

  private refreshTable(productGroupId: number, colorId: number) {
    this.loaderService.startLoader("Trwa wczytywanie")
    this.restService.getRodLengthsByProductGroupIdAndColorId(productGroupId, colorId).subscribe(value => {
      this.allRodLengths = value;
      this.loaderService.stopLoader();
    },error1 => {
      this.loaderService.stopLoader();
      this.snackBar.open("Wystąpił błąd !!!");
    })
  }

  addRodLength() {
    let rod = new Rod();
    rod.length = this.newLength;
    rod.price = this.newPrice;
    this.loaderService.startLoader("Proszę czekać")
    this.restService.addRodLength(rod).subscribe(value => {
      this.restService.setProductGroupForRodLength(value['id'], this.selectedProductGroup.id).subscribe(value1 => {
        this.restService.setColorForRodLength(value['id'], this.selectedColor.id).subscribe(value2 => {
          this.refreshTable(this.selectedProductGroup.id, this.selectedColor.id)
        }, error1 => {
          this.loaderService.stopLoader();
          this.snackBar.open("Wystąpił błąd !!!");
        })
      }, error2 => {
        this.loaderService.stopLoader();
        this.snackBar.open("Wystąpił błąd !!!");
      });
    }, error3 => {
      this.loaderService.stopLoader();
      this.snackBar.open("Wystąpił błąd !!!");
    });
  }

  getImageUrl(filename: string){
    return window.location.origin + '/kalkulator-admin/images/' + filename;
  }

  onPriceChange($event: any, id:number) {
    this.loaderService.startLoader("Aktualizowanie ceny...");
    this.restService.updatePriceForParameter(id, $event.target.value, 'rodLengthDefs').subscribe( value => {
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
    })
  }
}
