import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {RestService} from "../../services/rest.service";
import {map} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductGroup} from "../product";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ConfirmDialogComponent} from "../../material/confirm-dialog/confirm-dialog.component";
import {humanizeBytes, UploaderOptions, UploadFile, UploadInput, UploadOutput} from "ngx-uploader";
import {LoaderService} from "../../services/loader.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss']
})
export class ProductGroupComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'url', 'changePhoto', 'delete'];
  allProductGroups;

  productGroupFormGroup: FormGroup;

  options: UploaderOptions;
  files: UploadFile[];
  @Output()
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  isLoading: boolean;
  chosenFileName: string = "Nie wybrano pliku";

  constructor(private _formBuilder: FormBuilder,
              private restService: RestService,
              private dialog: MatDialog,
              private loaderService: LoaderService,
              private snackBar: MatSnackBar,
              private snackbarService: SnackbarService) {
    this.options = {concurrency: 1, maxUploads: 1};
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.productGroupFormGroup = this._formBuilder.group({
      productGroupNameCtrl: ['', Validators.required]
    });

    this.refreshTable()
  }

  addProductGroup() {
    var productGroup: ProductGroup = new ProductGroup();
    productGroup.name = this.productGroupFormGroup.getRawValue()['productGroupNameCtrl'];
    this.loaderService.startLoader("Dodawanie grupy produktów...");
    this.restService.addProductGroup(productGroup).subscribe(value => {
      this.productGroupFormGroup.reset();
      this.refreshTable();
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
      this.snackBar.open("Wystąpił błąd !!!");
    })
  }

  onClickDeleteAction(itemId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Usuwanie grupy produktów',
        header: 'Czy napewno chcesz wpis z grupą produktów?',
        confirmName: 'Usuń'
      }
    });
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.loaderService.startLoader("Usuwanie grupy produktów...");
        this.restService.deleteProductGroup(itemId).subscribe(value => {
          this.refreshTable();
        }, error1 => {
          if(error1.status === 409){
            this.snackbarService.error("Nie można usunąć elementu, ponieważ został on już przypisany do jednego z zamówień " +
              "lub do innego elementu. " +
              "Aby usunąć element najpierw należy usunąć wszystkie zamówienia z tym elementem.")
          } else {
            this.snackbarService.error("Wystąpił błąd podczas usuwania.");
          }
          this.loaderService.stopLoader();
        });
      }
    });
  }

  refreshTable() {
    this.restService.getAllProductGroups().pipe(map((response: any) => {
      return response._embedded.productGroupDefs;
    })).subscribe(value => {
      this.allProductGroups = value;
    })
  }

  onUploadOutput(output: UploadOutput, itemId: number): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      console.log('aaaaaaaaaaaa')
      const event: UploadInput = {
        type: 'uploadAll',
        url: '/kalkulator-admin/productGroupDefs/' + itemId + '/image',
        method: 'POST',
        data: { foo: 'bar' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
      this.chosenFileName = output.file.name;
      this.files.push(output.file);
    } else if (output.type === 'start') {
      this.isLoading = true;
      // this.loaderService.startLoader("Proszę czekać, trwa importowanie danych z pliku");
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
      this.isLoading = false;
      // this.loaderService.stopLoader();
    } else if (output.type === 'done') {
      if (output.file.responseStatus === 200) {
        // this.snackBarService.success("Poprawnie zaimportowano");
      } else {
        // this.snackBarService.error("Wystąpił błąd");
      }
      // this.setFileNameNotChosen();
      this.isLoading = false;
      // this.loaderService.stopLoader();
      // this.removeAllFiles();
      // this.dialogRef.close();
      this.refreshTable();
    }
  }

  // startUpload(): void {
  //   const event: UploadInput = {
  //     type: 'uploadAll',
  //     url: BWZ_SPRAWOZDANIE_DODAWANIE + "/" + this.idSprawozdania,
  //     method: 'POST'
  //   };
  //   this.uploadInput.emit(event);
  // }
  getImageUrl(filename: string){
    return window.location.origin + '/kalkulator-admin/images/' + filename;
  }

  onNameChange($event: any, id:number) {
    this.loaderService.startLoader("Aktualizowanie nazwy...");
    this.restService.updatenNameForParameter(id, $event.target.value, 'productGroupDefs').subscribe( value => {
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
    })
  }
}

