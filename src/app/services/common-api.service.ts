import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {
  
  constructor(
    private http: HttpClient
  ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Adjust this based on how you store the token
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }


  get(url: string, params: any){
    const options = {
      headers: this.getHeaders(),
      params:  params ? new HttpParams({ fromObject: params }) : undefined
    }
    return this.http.get(url, options ).pipe(
      catchError(error => {
        console.error('HTTP GET Error:', error);
        return throwError(() => new Error('Something went wrong. Please try again.'));
      }) 
    )
  }

  post(url: string, body: any, params: any){
    const options = {
      headers: this.getHeaders(),
      params:  params ? new HttpParams({ fromObject: params }) : undefined
    }
    return this.http.post(url, body, options).pipe(
      catchError(error => {
        console.error('HTTP POST Error:', error);
        return throwError(() => new Error('Something went wrong. Please try again.'));
      }) 
    )
  }

  put(url: string, body: any, params: any){
    const options = {
      headers: this.getHeaders(),
      params:  params ? new HttpParams({ fromObject: params }) : undefined
    }
    return this.http.put(url, body, options).pipe(
      catchError(error => {
        console.error('HTTP PUT Error:', error);
        return throwError(() => new Error('Something went wrong. Please try again.'));
      }) 
    )
  }

  delete(url: string, params: any){
    const options = {
      headers: this.getHeaders(),
      params:  params ? new HttpParams({ fromObject: params }) : undefined
    }
    return this.http.delete(url, options).pipe(
      catchError(error => {
        console.error('HTTP DELETE Error:', error);
        return throwError(() => new Error('Something went wrong. Please try again.'));
      }) 
    )
  }

}
