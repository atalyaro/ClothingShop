import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { ServerService } from './services/server.service';

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
              console.log("blah")
              localStorage.access_token = res.access_token
              this._data.loggedUser = res.user
              this._data.isloggedin = true
            }, err => {
              console.log(err)
            }
          )
        } else if (res.user) {
          console.log(res.user)
          this._data.loggedUser = res.user
          this._data.isloggedin = true
          // this._r.navigateByUrl("/homepagebeforelogin/main")
        }
      }, err => {
        console.log(err)
      }
    )
    if (localStorage.access_token) {
      this._server.checkinguserstatus()
    }
  }
}

