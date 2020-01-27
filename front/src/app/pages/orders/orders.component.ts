import {Component, OnInit, ViewChild} from '@angular/core';
import {map} from "rxjs/operators";
import {RestService} from "../../services/rest.service";
import {MatDialog, MatPaginator, MatSelectChange, MatTableDataSource} from "@angular/material";
import {OrderToSend} from "./order-to-send";
import {OrderPreviewComponent} from "./order-preview/order-preview.component";
import {ConfirmDialogComponent} from "../../material/confirm-dialog/confirm-dialog.component";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'data', 'allegroNick', 'email', 'phoneNumber',
    'additionalInformations','status', 'preview', 'delete'];
  // allOrders: OrderToSend[];
  allOrders = new MatTableDataSource<OrderToSend>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private restService: RestService,
              private dialog: MatDialog,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.allOrders.paginator = this.paginator;
    this.refreshTable()
  }

  refreshTable() {
    this.loaderService.startLoader("Wczytywanie danych...");
    this.restService.getAllOrders().pipe(map((response: any) => {
      return response._embedded.singleOrders;
    })).subscribe(value => {
      this.loaderService.stopLoader();
      console.log(value);
      this.allOrders.data = value;
    }, error1 => {
      this.loaderService.stopLoader();
    })
  }


  onClickPreviewAction(id: number, element: any) {
    this.dialog.open(OrderPreviewComponent, {
      height: '700px',
      width: '800px',
      data: {id: id, order: element},
    });
  }

  onClickDeletAction(id: number){
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
        this.restService.deleteOrder(id).subscribe(value => {
          this.refreshTable();
        });
      }
    });
  }

  onSelectChange($event: MatSelectChange, id: any) {
    this.loaderService.startLoader("Aktualizowanie statusu zamówienia...");
    this.restService.updateStatusForOrder(id,$event.value).subscribe(value => {
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
    })
  }
}
