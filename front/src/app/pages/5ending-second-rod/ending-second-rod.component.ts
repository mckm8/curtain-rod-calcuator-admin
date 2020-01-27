import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Color, Ending, ProductGroup} from "../product";
import {humanizeBytes, UploaderOptions, UploadFile, UploadInput, UploadOutput} from "ngx-uploader";
import {RestService} from "../../services/rest.service";
import {MatDialog} from "@angular/material/dialog";
import {LoaderService} from "../../services/loader.service";
import {SnackbarService} from "../../services/snackbar.service";
import {ConfirmDialogComponent} from "../../material/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-ending-second-rod',
  templateUrl: './ending-second-rod.component.html',
  styleUrls: ['./ending-second-rod.component.scss']
})
export class EndingSecondRodComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'imageUrl', 'changePhoto', 'delete'];
  endingsByPgAndColor;
  selectedProductGroup: ProductGroup;
  selectedColor: Color;

  newName = '';
  newPrice = 10;

  options: UploaderOptions;
  files: UploadFile[];
  @Output()
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  isLoading: boolean;
  chosenFileName: string = "Nie wybrano pliku";

  constructor(private restService: RestService,
              private dialog: MatDialog,
              private loaderService: LoaderService,
              private snackbarService: SnackbarService) {
    this.options = {concurrency: 1, maxUploads: 1};
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
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
        title: 'Usuwanie zakończenia',
        header: 'Czy napewno chcesz wpis z zakończeniem?',
        confirmName: 'Usuń'
      }
    });
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.loaderService.startLoader("Trwa wczytywanie")
        this.restService.deleteEndingSecondRod(itemId).subscribe(value => {
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

  addEnding() {
    let ending = new Ending();
    ending.name = this.newName;
    ending.price = this.newPrice;
    this.loaderService.startLoader("Proszę czekać")
    this.restService.addEndingSecondRod(ending).subscribe(value => {
      this.restService.setProductGroupForEndingSecondRod(value['id'], this.selectedProductGroup.id).subscribe(value1 => {
        this.restService.setColorForEndingSecondRod(value['id'], this.selectedColor.id).subscribe(value2 => {
          this.refreshTable(this.selectedProductGroup.id, this.selectedColor.id)
        })
      });
    }, error1 => {
      this.loaderService.stopLoader();
      this.snackbarService.error("Wystąpił błąd. Skontaktuj się z administratorem.")
    });
  }

  onUploadOutput(output: UploadOutput, itemId: number): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      const event: UploadInput = {
        type: 'uploadAll',
        url: '/kalkulator-admin/endingSecondRodDefs/' + itemId + '/image',
        method: 'POST',
        data: {foo: 'bar'}
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
      this.chosenFileName = output.file.name;
      this.files.push(output.file);
    } else if (output.type === 'start') {
      this.isLoading = true;
      this.loaderService.startLoader("Proszę czekać, trwa wgrywanie obrazka");
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'rejected') {
      this.dragOver = false;
      this.loaderService.stopLoader();
    } else if (output.type === 'done') {
      if (output.file.responseStatus === 200) {
        this.snackbarService.success("Poprawnie wgrano obrazek");
      } else {
        this.snackbarService.error("Wystąpił błąd");
      }
      this.isLoading = false;
      this.loaderService.stopLoader();
      this.refreshTable(this.selectedProductGroup.id, this.selectedColor.id)
    }
  }

  private refreshTable(productGroupId: number, colorId: number) {
    this.loaderService.startLoader("Trwa wczytywanie")
    this.restService.getEndingSecondRodsByProductGroupIdAndColorId(productGroupId, colorId).subscribe(value => {
      this.endingsByPgAndColor = value;
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
    })
  }

  getImageUrl(filename: string){
    return window.location.origin + '/kalkulator-admin/images/' + filename;
  }

  onNameChange($event: any, id:number) {
    this.loaderService.startLoader("Aktualizowanie nazwy...");
    this.restService.updatenNameForParameter(id, $event.target.value, 'endingSecondRodDefs').subscribe( value => {
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
    })
  }

  onPriceChange($event: any, id:number) {
    this.loaderService.startLoader("Aktualizowanie ceny...");
    this.restService.updatePriceForParameter(id, $event.target.value, 'endingSecondRodDefs').subscribe( value => {
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
    })
  }
}
