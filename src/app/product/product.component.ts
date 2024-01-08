import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() productInfo = new EventEmitter<any>();
  @Output() productInfoForUpdate = new EventEmitter<any>();
  @Output() productInfoForDelete = new EventEmitter<any>();

  getInfo(){
    this.productInfo.emit(this.product);
  }

  getInfoForUpdate(){
    this.productInfoForUpdate.emit(this.product);
  }

  getInfoForDelete(){
    this.productInfoForDelete.emit(this.product);
  }

}
