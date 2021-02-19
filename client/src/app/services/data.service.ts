import { Injectable } from '@angular/core';
import UserInterface from '../interfaces/user.interface';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import CategoryInterface from '../interfaces/category.interface';
import ProductInterface from '../interfaces/product.inteface';
import { MatSnackBar } from '@angular/material/snack-bar';
import ProductInCartInterface from '../interfaces/productincart.inteface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public loggedUser: UserInterface
  public isloggedin: Boolean = false
  public cities: String[] = ['Tel Aviv', 'Jerusalem', 'Eilat', 'Rishon LeZion',
    'Beersheba', 'Ashdod', 'Haifa', 'Netanya', 'Ramat Gan', 'Rehovot']
  public sentencestatus: String = ""
  public buttonstatus: String = "Start Shopping"
  public categories: CategoryInterface[]
  public cart_id: Number
  public productsofcart: ProductInCartInterface[]
  public products: ProductInterface[]
  public cartprice: Number = 0

  public openSnackbar(msg) {
    this._sb.open(msg, "", {
      duration: 2500,
      verticalPosition: 'top'
    })
  }

  constructor(public _r: Router, public _sb: MatSnackBar) { }

}
