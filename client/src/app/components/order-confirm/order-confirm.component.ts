import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ServerService } from 'src/app/services/server.service';
import { DialogConfirmData } from '../order-page/order-page.component';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {

  constructor(public _data: DataService, public _server: ServerService,
    public _r: Router,
    public dialogRef: MatDialogRef<OrderConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirmData) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  getrecipt() {
    this._server.getrecipt({ productsofcart: this.data.productsOfCartDataOrder, cartprice: this.data.cartPriceDataOrder }).subscribe(
      (res: any) => {
        const blob = new Blob([res], { type: 'text/plain' })
        fileSaver.saveAs(blob, `${this._data.loggedUser.user_id}_recipt.txt`)
      }, err => {
        console.log(err)
      }
    )
  }

}
