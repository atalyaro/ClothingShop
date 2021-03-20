import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { DataService } from 'src/app/services/data.service';
import { ServerService } from 'src/app/services/server.service';
import UserInterface from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ProductInterface from 'src/app/interfaces/product.inteface';
import { MatSidenav } from '@angular/material/sidenav';
import { AppComponent } from 'src/app/app.component';
// import { ngOnInit } from AppComponent;

@Component({
  selector: 'app-home-page-after-login',
  templateUrl: './home-page-after-login.component.html',
  styleUrls: ['./home-page-after-login.component.css']
})
export class HomePageAfterLoginComponent implements OnInit {

  constructor(public _data: DataService, public _server: ServerService, public _r: Router, public _fb: FormBuilder) { }

  public newProductForm: FormGroup
  @ViewChild('drawer', { static: true }) drawer: MatSidenav

  ngOnInit(): void {
    this._data.sidenav = this.drawer
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
        this._data.cartprice = res.meanwhileprice
        if (res.meanwhileprice === null) this._data.cartprice = 0
      }, err => {
        console.log(err)
      }
    )
    this.newProductForm = this._fb.group({
      product_name: ["", [Validators.required]],
      product_price: [, [Validators.required]],
      image: ["", [Validators.required]],
      category_id: [, [Validators.required]]
    })
    this._data.editProductForm = this._fb.group({
      product_name: [, [Validators.required]],
      product_price: [, [Validators.required]],
      image: [, [Validators.required]],
      category_id: [, [Validators.required]]
    })
  }

  choosecategory(e) {
    this._data.choosenCategory = e.target.outerText
    this._server.getproductsbycategory(this._data.choosenCategory).subscribe(
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
          this._data.cart_id = undefined
          this._data.choosenCategory = ""
          this._data.productsofcart = []
          this._data.cartprice = 0
          this._data.products = []
          this._data.notfoundsearch = false
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
        if (!res.productsbysearch.length) this._data.notfoundsearch = true
        this._data.products = res.productsbysearch
        this._r.navigateByUrl('homepageafterlogin/productsarea')
      }, err => {
        console.log(err)
      }
    )
  }

  deleteoneproductcart(productincart_id, cart_id) {
    this._server.deleteoneproductcart(productincart_id, cart_id).subscribe(
      (res: any) => {
        this._data.productsofcart = res.productsofcart
        this._data.cartprice = res.meanwhileprice
        if (res.meanwhileprice === null)
          this._data.cartprice = 0
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

  saveNewProduct() {
    this._server.addproduct(this.newProductForm.value).subscribe(
      (res: any) => {
        this._server.getproductsbycategory(this._data.choosenCategory).subscribe(
          (res: any) => {
            this._data.products = res.productsbycategory
            this.ngOnInit()
            this._data.sidenav.close()
            this._data.showNewForm = false
          }, err => {
            console.log(err)
          }
        )
      }, err => {
        console.log(err)
      }
    )
  }

  editproduct() {
    this._server.editproduct({ ...this._data.editProductForm.value, product_id: this._data.choosenProductID }).subscribe(
      (res: any) => {
        this._server.getproductsbycategory(this._data.choosenCategory).subscribe(
          (res: any) => {
            this._data.products = res.productsbycategory
            this.ngOnInit()
            this._data.sidenav.close()
            this._data.showEditForm = false
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
