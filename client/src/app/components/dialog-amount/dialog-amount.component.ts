import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { ServerService } from 'src/app/services/server.service';
import { DialogAmountData } from '../product-card/product-card.component';

@Component({
  selector: 'app-dialog-amount',
  templateUrl: './dialog-amount.component.html',
  styleUrls: ['./dialog-amount.component.css']
})
export class DialogAmountComponent implements OnInit {

  constructor(public _data: DataService, public _server: ServerService,
    public dialogRef: MatDialogRef<DialogAmountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogAmountData, public _fb: FormBuilder) { }

  // public myForm: FormGroup
  // public amount: Number = 1

  ngOnInit(): void {
    // this.myForm = this._fb.group({
    //   amount: [1, Validators.required, Validators.min(0), Validators.max(100)]
    // })
  }

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
