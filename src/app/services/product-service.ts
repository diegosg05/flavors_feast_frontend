import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Categoria } from '../interfaces/producto';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = 'http://localhost:8080/api/v2/productos';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ApiResponse<Categoria[]>> {
    return this.http.get<Categoria>(this.API_URL)
    .pipe(
      map(data => ({ data } as unknown as ApiResponse<Categoria[]>)),
      catchError(this.handleError)  
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error';

    if(error.error instanceof ErrorEvent){
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del backend
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }

    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
