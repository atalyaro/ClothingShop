import { Component, Input, OnInit, Inject } from '@angular/core';
import ProductInterface from 'src/app/interfaces/product.inteface';
import { DataService } from 'src/app/services/data.service';
import { ServerService } from 'src/app/services/server.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAmountComponent } from '../dialog-amount/dialog-amount.component';


export interface DialogAmountData {
  productitem: ProductInterface;
  amount: number;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor(public _data: DataService, public _server: ServerService,
    public dialog: MatDialog) { }

  @Input()
  public productitem: ProductInterface


  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAmountComponent, {
      width: '250px',
      data: { productitem: this.productitem, amount: 1 }
    })
  }

  openeditform() {
    console.log("blah")
    this._data.showEditForm = true
    this._data.showNewForm = false
    this._data.choosenProductID = this.productitem.product_id
    this._data.editProductForm.controls['product_name'].patchValue(this.productitem.product_name)
    this._data.editProductForm.controls['product_price'].patchValue(this.productitem.product_price)
    this._data.editProductForm.controls['image'].patchValue(this.productitem.image)
    this._data.editProductForm.controls['category_id'].patchValue(this.productitem.category_id)
    this._data.sidenav.toggle()
  }
}