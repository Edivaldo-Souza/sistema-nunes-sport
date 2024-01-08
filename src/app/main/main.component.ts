import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,ProductComponent,ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

    showInfoTag = false;
    showCreateTag = false;
    showUpdateTag = false;
    showDeleteTag = false;
    showNoResultsTag = false;

    newProductForm = new FormGroup({
      name: new FormControl(''),
      code: new FormControl(''),
      description: new FormControl(''),
      value: new FormControl(0)
    })

    productList: Product[] = [];
    productService: ProductService = inject(ProductService);
    filteredProductList: Product[] = [];
    productName = ""
    productCode = ""
    productDescription = ""
    productValue = 0

    getAllProducts(){
      this.productService.getAllProducts().subscribe(
        (response)=>{
          this.productList = response;
          this.filteredProductList = this.productList;
          this.showNoResultsTag = false;
          console.log(this.filteredProductList.length)
        }
      )
      if(this.filteredProductList.length<=0){
        this.showNoResultsTag = true;
      }
    }

    constructor(){
      this.getAllProducts()
    }

    filterProducts(filter:string){
      this.hideDeletePopUp();
      this.hideInfoPopUp();
      this.hideUpdatePopUp();
      this.showCreateTag = false;
      if(!filter){
        this.filteredProductList = this.productList;
      }
      else{
        this.filteredProductList = this.productList.filter(product=>{
          if(product?.name.toLowerCase().includes(filter.toLowerCase())){
            return product;
          }
          else{
            return null;
          }})
        }
        if(this.filteredProductList.length<=0){
          this.showNoResultsTag = true;
        }
      }
    
    getInfo(data: Product){
      if(this.showInfoTag == false){
        this.showInfoTag = !this.showInfoTag
        this.showCreateTag = false;
        this.showUpdateTag = false;
        this.showDeleteTag = false;
        this.productName = data.name ?? "";
        this.productCode = data.code ?? "";
        this.productDescription = data.description ?? "";
        this.productValue = data.value ?? "";
      }
    }

    addProduct(){
      const data = {
        name: this.newProductForm.value.name ?? '',
        code: this.newProductForm.value.code ?? '',
        description: this.newProductForm.value.description ?? '',
        value: this.newProductForm.value.value ?? 0
      }
      this.productService.createProduct(data).subscribe(
        (response)=>{
          this.showCreateTag = false;
          this.getAllProducts();
        })
    }

    updateProduct(){
      const data = {
        name: this.newProductForm.value.name ?? '',
        code: this.newProductForm.value.code ?? '',
        description: this.newProductForm.value.description ?? '',
        value: this.newProductForm.value.value ?? 0
      }
      this.productService.updateProduct(data).subscribe(
        (response)=>{
          this.showUpdateTag = false;
          this.getAllProducts();
        })
    }

    deleteProduct(){
      this.productService.deleteProdcut(this.productCode).subscribe(
        (response)=>{
          this.showDeleteTag = false;
          this.getAllProducts();
        }
      )
    }

    setUpdateProductValues(data: Product){
      if(this.showUpdateTag == false){
        this.showUpdateTag = !this.showUpdateTag;
        this.showCreateTag = false;
        this.showInfoTag = false;
        this.showDeleteTag = false;
        this.newProductForm.setValue({
          name: data.name,
          code: data.code,
          description: data.description,
          value: data.value
        })
      }
    }

    setDeleteProductValues(data:Product){
      if(this.showDeleteTag == false){
        this.showCreateTag = false;
        this.showUpdateTag = false;
        this.showInfoTag = false;
        this.showDeleteTag = !this.showDeleteTag;
        this.productName = data.name
        this.productCode = data.code
      }
    }    

    hideInfoPopUp(){
      this.showInfoTag = false;
    }

    hideUpdatePopUp(){
      this.showUpdateTag = false;
      this.newProductForm.reset();
    }
    toggleCreatePopUp(){
      this.showCreateTag = !this.showCreateTag;
      this.hideUpdatePopUp();
      this.hideInfoPopUp();
      this.hideDeletePopUp();
    }

    hideDeletePopUp(){
      this.showDeleteTag = false;
      this.productName = ""
      this.productCode = ""
    }
}
