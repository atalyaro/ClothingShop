import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import UserInterface from 'src/app/interfaces/user.interface';
import { DataService } from 'src/app/services/data.service';
import { ServerService } from 'src/app/services/server.service';
import ProductInCartInterface from 'src/app/interfaces/productincart.inteface';
import { OrderConfirmComponent } from '../order-confirm/order-confirm.component';

import * as _moment from 'moment';
import 'moment/locale/pt-br';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11Label: 'MMMM YYYY'
  }
}

export interface DialogConfirmData {
  productsOfCartDataOrder: ProductInCartInterface[]
  cartPriceDataOrder: Number
}

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  constructor(public _data: DataService, public _server: ServerService,
    public _r: Router, public _fb: FormBuilder, public dialog: MatDialog) { }

  public ordersdates: Date[] = []
  public today: Date = new Date()
  public myForm: FormGroup
  public productsOfCartBeforeOrder: ProductInCartInterface[] = this._data.productsofcart
  public cartPriceDataBeforeOrder: Number = this._data.cartprice

  myFilter = (d: Date): boolean => {
    let ordersdatesformat = []
    for (let i = 0; i < this.ordersdates.length; i++) {
      ordersdatesformat.push(_moment(new Date(this.ordersdates[i])).format('YYYY-MM-DD'))
    }
    return ordersdatesformat.findIndex(ot => d.toISOString().slice(0, 10) == ot) < 0
  }

  ngOnInit(): void {
    this.productsOfCartBeforeOrder = this._data.productsofcart
    this.cartPriceDataBeforeOrder = this._data.cartprice

    this.myForm = this._fb.group({
      city: ["", Validators.required],
      street: ["", [Validators.required]],
      date_of_order: ["", [Validators.required]],
      creditCard: ["", [Validators.required, Validators.pattern("^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$")]],
      four_digits_creditcard: [, [Validators.required, Validators.min(1000), Validators.max(9999)]]
    })

    this._server.getcartandproducts().subscribe(
      (res: any) => {
        this._data.cart_id = res.opencartid
        this._data.productsofcart = res.productsofcart
      }, err => {
        console.log(err)
      }
    )
    this._server.getordersdates().subscribe(
      (res: any) => {
        this.ordersdates = res.datesorders
      }, err => {
        console.log(err)
      }
    )
  }

  changeInput() {
    this.myForm.controls['city'].patchValue(this._data.loggedUser.city);
    this.myForm.controls['street'].patchValue(this._data.loggedUser.street);
  }

  addorder() {
    this._server.addorder({
      ...this.myForm.value, cart_id: this._data.cart_id,
      date_of_order: _moment(new Date(this.myForm.value['date_of_order'])).format('MM-DD-YYYY')
    }).subscribe(
      (res: any) => {
        console.log(res.msg)
        this._data.productsofcart = []
        this._data.cartprice = 0
        this._data.cart_id = undefined
        this._server.checkinguserstatus()
      }, err => {
        console.log(err)
      }
    )
  }

  logout() {
    this._server.logout().subscribe(
      (res: any) => {
        if (!res.err) {
          delete localStorage['access_token']
          delete localStorage['refresh_token']
          this._data.loggedUser = {} as UserInterface
          this._data.isloggedin = false
          this._server.checkinguserstatus()
          this._data.buttonstatus = "Start Shopping"
          this._data.cart_id = undefined
          this._data.choosenCategory = ""
          this._data.productsofcart = []
          this._data.cartprice = 0
          this._data.products = []
          this._data.notfoundsearch = false
          this._r.navigateByUrl('homepagebeforelogin/main')
          this._data.openSnackbar("logout successfully")
        }
      }, err => {
        console.log(err)
      }
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(OrderConfirmComponent, {
      width: '350px', disableClose: true,
      data: {
        productsOfCartDataOrder: this.productsOfCartBeforeOrder,
        cartPriceDataOrder: this.cartPriceDataBeforeOrder
      }
    })
  }
}