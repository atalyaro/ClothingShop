import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { ServerService } from './services/server.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public _data: DataService, public _server: ServerService) { }

  ngOnInit() {
    this._server.checkinglogin().subscribe(
      (res: any) => {
        if (res.msg === "jwt expired") {
          this._server.refresh().subscribe(
            (res: any) => {
              localStorage.access_token = res.access_token
              this._data.loggedUser = res.user
              this._data.isloggedin = true
              this._server.checkinguserstatus()
            }, err => {
              console.log(err)
            }
          )
        } else if (res.user) {
          console.log("Blah")
          this._data.loggedUser = res.user
          this._data.isloggedin = true
        }
      }, err => {
        console.log(err)
      }
    )
    if (localStorage.access_token) {
      const decoded: any = jwt_decode(localStorage.access_token)
      if (Date.now() / 1000 < decoded.exp) {
        this._server.checkinguserstatus()
      }
    }
  }
}

