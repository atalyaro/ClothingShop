import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-products-area',
  templateUrl: './products-area.component.html',
  styleUrls: ['./products-area.component.css']
})
export class ProductsAreaComponent implements OnInit {

  constructor(public _data: DataService) { }

  ngOnInit(): void {
  }

}
