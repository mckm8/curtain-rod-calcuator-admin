import {Component, EventEmitter, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {humanizeBytes, UploaderOptions, UploadFile, UploadInput, UploadOutput} from "ngx-uploader";
import {RestService} from "../../services/rest.service";
import {MatDialog, MatSelect, MatSelectChange, MatSnackBar} from "@angular/material";
import {Color, ProductGroup} from "../product";
import {ConfirmDialogComponent} from "../../material/confirm-dialog/confirm-dialog.component";
import {map} from "rxjs/operators";
import {LoaderService} from "../../services/loader.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'imageUrl', 'changePhoto', 'productGroups', 'delete'];
  allColors;
  allProductGroups: ProductGroup[];

  colorFormGroup: FormGroup;

  @ViewChildren(MatSelect) matSelects: QueryList<MatSelect>;

  options: UploaderOptions;
  files: UploadFile[];
  @Output()
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  isLoading: boolean;
  chosenFileName: string = "Nie wybrano pliku";

  isSelectionChanged: boolean = false;

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
    this.colorFormGroup = this._formBuilder.group({
      colorNameCtrl: ['', Validators.required]
    });
    this.loaderService.startLoader('Ładowanie grup produktów');
    this.restService.getAllProductGroups().pipe(map((response: any) => {
      return response._embedded.productGroupDefs;
    })).subscribe(value => {
      this.allProductGroups = value;
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
      this.snackBar.open("Wystąpił błąd !!!");
    })
    this.refreshTable();
  }

  addColor() {
    var color: Color = new Color();
    color.name = this.colorFormGroup.getRawValue()['colorNameCtrl']
    this.restService.addColor(color).subscribe(value => {
      this.colorFormGroup.reset();
      this.refreshTable();
    })
  }

  onClickDeleteAction(itemId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Usuwanie koloru',
        header: 'Czy napewno chcesz wpis z kolorem?',
        confirmName: 'Usuń'
      }
    });
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.loaderService.startLoader("Usuwanie koloru...");
        this.restService.deleteColor(itemId).subscribe(value => {
          this.refreshTable();
          this.loaderService.stopLoader();
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
    this.restService.getAllColors().pipe(map((response: any) => {
      return response._embedded.colorDefs;
    })).subscribe(value => {
      this.allColors = value;
      this.fillSelections();
    })
  }

  onUploadOutput(output: UploadOutput, itemId: number): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      const event: UploadInput = {
        type: 'uploadAll',
        url: '/kalkulator-admin/colorDefs/' + itemId + '/image',
        method: 'POST',
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


  onSelectChange($event: MatSelectChange, id: number) {
    this.isSelectionChanged = true;
  }

  fillSelections() {
    //todo zamienic timeout na informacje o wyrenderowanych mat-selectach
    setTimeout(() => {
      this.matSelects.forEach(matSelect => {
        this.restService.getProductGroupsForColor(Number(matSelect.id)).pipe(map((response: any) => {
          return response._embedded.productGroupDefs;
        })).subscribe(value => {
          matSelect.value = this.allProductGroups.filter(item => {
            return value
              .map(value1 => value1.id)
              .includes(item.id)
          })
        });
      })
    }, 100);
  }

  onSelectClosed(id: number) {
    if (this.isSelectionChanged) {
      let matSelectControl = this.matSelects.find(matSelect => matSelect.id === id.toString());
      this.restService.setProductGroupsForColor(id, matSelectControl.value.map(color => color['_links'].self.href))
        .subscribe(value => {
          this.isSelectionChanged = false;
        });
    }
  }

  getImageUrl(filename: string) {
    return window.location.origin + '/kalkulator-admin/images/' + filename;
  }

  onNameChange($event: any, id: number) {
    this.loaderService.startLoader("Aktualizowanie nazwy...");
    this.restService.updatenNameForParameter(id, $event.target.value, 'colorDefs').subscribe(value => {
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
    })
  }
}
