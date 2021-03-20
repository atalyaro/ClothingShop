import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { delay } from 'rxjs/operators';

import * as _moment from 'moment';
import 'moment/locale/pt-br';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11Label: 'MMMM YYYY'
  }
}

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient, public _data: DataService) { }

  login(body) {
    return this.http.post("http://localhost:1000/auth/login", body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  refresh() {
    return this.http.get("http://localhost:1000/auth/refresh", {
      headers: { 'refresh': localStorage.refresh_token }
    })
  }

  infoweb() {
    return this.http.get("http://localhost:1000/auth/infoweb")
  }

  checkinglogin() {
    return this.http.get("http://localhost:1000/auth/checkinglogin", {
      headers: { 'token': localStorage.access_token }
    })
  }

  checkinguserstatus() {
    return this.http.get("http://localhost:1000/auth/checkinguserstatus", {
      headers: { 'token': localStorage.access_token }
    }).subscribe(
      (res: any) => {
        if (this._data.loggedUser.access) {
          this._data.sentencestatus = ""
          this._data.buttonstatus = "Go To Store"
        } else if (!res.err && res.dateofcart) {
          this._data.buttonstatus = "Continue Shopping"
          if (res.meanwhileprice === null) res.meanwhileprice = 0
          this._data.sentencestatus = `Hello ${this._data.loggedUser.first_name}, you have unsubmitted cart from
          ${_moment(new Date(res.dateofcart)).format('DD/MM/YYYY')} and its total price is ${res.meanwhileprice}$`
          this._data.cartprice = res.meanwhileprice
        } else if (!res.err && res.last_order_date) {
          this._data.buttonstatus = "Start Shopping"
          this._data.sentencestatus = `Hello ${this._data.loggedUser.first_name}, your last purchase was on
          ${_moment(new Date(res.last_order_date)).format('DD/MM/YYYY')}`
        } else if (!res.err) {
          this._data.buttonstatus = "Start Shopping"
          this._data.sentencestatus = `Hello ${this._data.loggedUser.first_name}, welcome to your first purchase`
        }
      }, err => {
        this._data.sentencestatus = ""
        console.log(err)
      }
    )
  }
  getallusersid(id: number) {
    return (this.http.get("http://localhost:1000/users/" + id)).pipe(delay(5000))
  }

  register(formA, formB) {
    return this.http.post("http://localhost:1000/auth/register", { formA, formB }, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  getcategories() {
    return this.http.get("http://localhost:1000/categories/", {
      headers: { 'token': localStorage.access_token }
    })
  }

  getproductsbycategory(categoryname) {
    return this.http.get("http://localhost:1000/products/" + categoryname, {
      headers: { 'token': localStorage.access_token }
    })
  }

  logout() {
    return this.http.get("http://localhost:1000/auth/logout")
  }

  searchproduct(searchword) {
    return this.http.get("http://localhost:1000/products/search/" + searchword, {
      headers: { 'token': localStorage.access_token }
    })
  }

  getcartandproducts() {
    return this.http.get("http://localhost:1000/productsincarts/", {
      headers: { 'token': localStorage.access_token }
    })
  }

  addtocart(body) {
    return this.http.post("http://localhost:1000/productsincarts/add", body, {
      headers: {
        'token': localStorage.access_token,
        'Content-Type': 'application/json'
      }
    })
  }

  deleteoneproductcart(productincart_id: Number, cart_id: Number) {
    const options = {
      headers: new HttpHeaders({
        'token': localStorage.access_token,
        'Content-Type': 'application/json'
      }),
      body: {
        productincart_id, cart_id
      }
    }
    return this.http.delete("http://localhost:1000/productsincarts/deleteoneproduct", options)
  }

  deleteallproductscart(cart_id: Number) {
    const options = {
      headers: new HttpHeaders({
        'token': localStorage.access_token,
        'Content-Type': 'application/json'
      }),
      body: {
        cart_id
      }
    }
    return this.http.delete("http://localhost:1000/productsincarts/deleteallcart", options)
  }

  getordersdates() {
    return this.http.get("http://localhost:1000/orders/datesorders", {
      headers: { 'token': localStorage.access_token }
    })
  }

  addorder(body) {
    return this.http.post("http://localhost:1000/orders/add", body, {
      headers: {
        'token': localStorage.access_token,
        'Content-Type': 'application/json'
      }
    })
  }

  getrecipt(body) {
    return this.http.post("http://localhost:1000/orders/recipt", body, {
      headers: {
        'token': localStorage.access_token,
        'Content-Type': 'application/json',
      },
      responseType: 'blob'
    })
  }

  addproduct(body) {
    return this.http.post("http://localhost:1000/products/add", body, {
      headers: {
        'token': localStorage.access_token,
        'Content-Type': 'application/json'
      }
    })
  }

  editproduct(body) {
    return this.http.put("http://localhost:1000/products/edit", body, {
      headers: {
        'token': localStorage.access_token,
        'Content-Type': 'application/json'
      }
    })
  }
}