import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { DataService } from 'src/app/services/data.service';
import { ServerService } from 'src/app/services/server.service';
import UserInterface from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-after-login',
  templateUrl: './home-page-after-login.component.html',
  styleUrls: ['./home-page-after-login.component.css']
})
export class HomePageAfterLoginComponent implements OnInit {

  constructor(public _data: DataService, public _server: ServerService, public _r: Router) {

  }

  ngOnInit(): void {
    this._server.getcategories().subscribe(
      (res: any) => {
        this._data.categories = res.categories
      }, err => {
        console.log(err)
      }
    )
    this._server.getcartandproducts().subscribe(
      (res: any) => {
        this._data.cart_id = res.opencartid
        this._data.productsofcart = res.productsofcart
        console.log(this._data.cart_id)
      }, err => {
        console.log(err)
      }
    )

    console.log(this._data.loggedUser.access)
  }

  choosecategory(e) {
    this._server.getproductsbycategory(e.target.outerText).subscribe(
      (res: any) => {
        this._data.products = res.productsbycategory
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
          this._r.navigateByUrl('homepagebeforelogin/main')
          this._data.openSnackbar("logout successfully")
        }
      }, err => {
        console.log(err)
      }
    )
  }

  searchproducts(searchingword) {
    this._server.searchproduct(searchingword).subscribe(
      (res: any) => {
        this._data.products = res.productsbysearch
        this._r.navigateByUrl('homepageafterlogin/productsarea')
      }, err => {
        console.log(err)
      }
    )
  }

  deleteoneproductcart(productincart_id, cart_id, total_price: Number) {
    this._server.deleteoneproductcart(productincart_id, cart_id).subscribe(
      (res: any) => {
        this._data.productsofcart = res.productsofcart
        // this._data.cartprice = this._data.cartprice - total_price
      }, err => {
        console.log(err)
      }
    )
  }

  deleteallproducts(cart_id) {
    this._server.deleteallproductscart(cart_id).subscribe(
      (res: any) => {
        this._data.productsofcart = res.productsofcart
        this._data.cartprice = 0
      }, err => {
        console.log(err)
      }
    )
  }
}
