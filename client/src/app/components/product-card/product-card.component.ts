import { Component, Input, OnInit, Inject } from '@angular/core';
import ProductInterface from 'src/app/interfaces/product.inteface';
import { DataService } from 'src/app/services/data.service';
import { ServerService } from 'src/app/services/server.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  productitem: ProductInterface;
  amount: number;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor(public _data: DataService, public _server: ServerService, public dialog: MatDialog) { }

  @Input()
  public productitem: ProductInterface

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAmount, {
      width: '250px',
      data: { productitem: this.productitem, amount: 1 }
    })

  }
}

@Component({
  selector: 'app-product-card',
  templateUrl: './dialog-amount.html'
})
export class DialogAmount {

  constructor(public _data: DataService, public _server: ServerService,
    public dialogRef: MatDialogRef<DialogAmount>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  addproduct(amount, product_id) {
    this._server.addtocart({ amount, product_id, cart_id: this._data.cart_id }).subscribe(
      (res: any) => {
        this._data.cartprice = this._data.cartprice + res.totalprice
        this._server.getcartandproducts().subscribe(
          (res: any) => {
            this._data.productsofcart = res.productsofcart
          }, err => {
            console.log(err)
          }
        )
      }, err => {
        console.log(err)
      }
    )
  }
}