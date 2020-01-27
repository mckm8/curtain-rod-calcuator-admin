import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  title: string;
  header: string;
  confirmName: string;
  cancelName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.title = this.data['title'];
    this.header = this.data['header'];
    this.confirmName = this.data['confirmName'];
    if (this.data['cancelName']) {
      this.cancelName = this.data['cancelName'];
    } else {
      this.cancelName = 'Anuluj';
    }
  }
}
