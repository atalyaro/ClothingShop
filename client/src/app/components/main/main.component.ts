import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public _fb: FormBuilder, public _server: ServerService, public _data: DataService,
    public _r: Router) { }

  public myForm: FormGroup
  public productsamount: Number
  public ordersamount: Number

  ngOnInit(): void {
    this.myForm = this._fb.group({
      email: ["", Validators.required],
      password: ["", [Validators.required]]
    })

    this._server.infoweb().subscribe(
      (res: any) => {
        this.productsamount = res.productsamount
        this.ordersamount = res.ordersamount
      }, err => {
        console.log(err)
      }
    )
  }

  handlesubmit() {
    this._server.login(this.myForm.value).subscribe(
      (res: any) => {
        localStorage.access_token = res.access_token
        localStorage.refresh_token = res.refresh_token
        this._data.isloggedin = true
        this._data.loggedUser = res.user
        this._server.checkinguserstatus()
      }, err => {
        console.log(err)
      }
    )

  }
}
