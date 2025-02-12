import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private url(requestParameter: Partial<RequestParameter>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : "" }`;
  }

  get<T>(requestParameter: Partial<RequestParameter>, id?: string, imageId? : string): Observable<T>{
    let url: string= "";

    if(requestParameter.fullEndPoint){
      url = requestParameter.fullEndPoint;
    }if(id == null){
      url =`${this.url(requestParameter)}`;
    }
    else{
      console.log("clientService id değeri: ", id);
      url = `${this.url(requestParameter)}/ ${id}`;

    }

    if (requestParameter.queryString) {
      url += `?${requestParameter.queryString}`;
    }
    
    let headers = requestParameter.headers || new HttpHeaders({
      'Authorization' : "Bearer " + localStorage.getItem("accessToken")as string
      
    });
   
    console.log("header : " , headers);
    return this.httpClient.get<T>(url, { headers : headers});
   
  } 

  post<T>(requestParameter: Partial<RequestParameter>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.url(requestParameter)}`;
    }
  
    let headers = requestParameter.headers || new HttpHeaders({
      'Content-Type': 'application/json',
      
    });
    headers= headers.set( 'Authorization' , "Bearer " + localStorage.getItem("accessToken")as string);
    
    var data = requestParameter.queryString
   
    return this.httpClient.post<T>(url, body, { headers: headers});
  }
  put<T>(requestParameter: Partial<RequestParameter>, body: Partial<T>): Observable<T>{

    let url: string = "";
    if(requestParameter.fullEndPoint){
      url = requestParameter.fullEndPoint;
    }
    else{
      url = `${this.url(requestParameter)}`;
    }
    let header = new Headers({ 'Authorization': `Bearer ${localStorage.getItem("accessToken")as string}` });
    
    
    return this.httpClient.put<T>(url, body, { headers: requestParameter.headers  });

  }
  delete<T>(requestParameter:Partial<RequestParameter>, id: string, imageId? : string ): Observable<T>{
   
    let url: string= "";
    if(requestParameter.fullEndPoint){
      url = requestParameter.fullEndPoint;
    }
    if(imageId==null){
      url = `${this.url(requestParameter)}/${id}`;
    }
    else{ 
      url = `${this.url(requestParameter)}/${id}/${imageId}`;
    
    
    }
    let headers = requestParameter.headers || new HttpHeaders({
      'Authorization' : "Bearer " + localStorage.getItem("accessToken")as string
      
    });
    console.log("url: " , url);
    console.log("header : " , headers);

    return this.httpClient.delete<T>(url, {headers: headers});

  }

}



export class RequestParameter{
  controller?: string;
  action?: string;
  queryString?: string;
  headers: HttpHeaders = new HttpHeaders();
  baseUrl?: string;
  fullEndPoint?: string;
}