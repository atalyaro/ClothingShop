import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CheckingPasswordsValidator } from "../../validators/checkingpasswords.validator"
import { IDValidator } from "../../validators/checkingid.validator"
import { ServerService } from 'src/app/services/server.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {


  constructor(public _fb: FormBuilder, public _server: ServerService, public _data: DataService) {
  }

  firstFormGroup: FormGroup
  secondFormGroup: FormGroup

  ngOnInit(): void {
    this.firstFormGroup = this._fb.group({
      user_id: [null, [Validators.required, Validators.min(100000000), Validators.max(999999999)]
        , IDValidator.createValidator(this._server)],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    }, {
      validator: [CheckingPasswordsValidator('password', 'confirmPassword')]
    })
    this.secondFormGroup = this._fb.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      city: ["", Validators.required],
      street: ["", [Validators.required]]
    })
  }

  register() {
    this._server.register(this.firstFormGroup.value, this.secondFormGroup.value).subscribe(
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
