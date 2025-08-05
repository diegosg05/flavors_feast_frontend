import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido, PedidoResponse } from '../interfaces/pedido';
import { ApiResponse } from '../interfaces/ApiResponse';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly API_URL: string = 'http://localhost:8080/api/auth/v2/pedido';
  private readonly API_URL_PEDIDOS: string = 'http://localhost:8080/api/auth/v2/pedidos';

  constructor(private http: HttpClient) {}

  postPedido(pedido: Pedido): Observable<ApiResponse<string>> {
    const token = localStorage.getItem('token'); // o sessionStorage, según dónde lo guardes

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<Pedido>(this.API_URL, pedido, { headers }).pipe(
      map((data) => ({ data } as unknown as ApiResponse<string>)),
      catchError(this.handleError)
    );
  }

  getPedidos(): Observable<ApiResponse<PedidoResponse[]>> {
    const token = localStorage.getItem('token'); // o sessionStorage, según dónde lo guardes

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<PedidoResponse[]>(this.API_URL_PEDIDOS, { headers }).pipe(
      map((data) => ({ data } as unknown as ApiResponse<PedidoResponse[]>)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
