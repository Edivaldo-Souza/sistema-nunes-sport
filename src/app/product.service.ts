import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = "http://localhost:5237/api/Product/";

  constructor(private http:HttpClient) { }

  getAllProducts(): Observable<any>{
    const data = this.http.get<any>(this.url);
    return  data ?? [];
  }

  createProduct(body:any): Observable<any>{
    const data = this.http.post<any>(this.url,body);
    return data ?? {}
  }

  updateProduct(body:any):Observable<any>{
    const data= this.http.put<any>(this.url,body);
    return data ?? {}
  }

  deleteProdcut(code:string):Observable<any>{
    const data = this.http.delete<any>(this.url+code);
    return data ?? {}
  }
}
