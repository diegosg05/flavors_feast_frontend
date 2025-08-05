import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';
import { Reserva, ReservaResponse } from '../interfaces/Reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private readonly api_url = 'http://localhost:8080/api/auth/v2/reserva';
  private readonly api_reservas_url = 'http://localhost:8080/api/auth/v2/reservas';

  constructor(private http: HttpClient) {}

  postReserva(reservaData: Reserva) {
    const token = localStorage.getItem('token'); // o sessionStorage, según dónde lo guardes

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(this.api_url, reservaData, { headers }).pipe(
      map((data) => ({ data } as unknown as ApiResponse<Reserva>)),
      catchError(this.handleError)
    );
  }

  getReservas(): Observable<ApiResponse<ReservaResponse[]>>{
    const token = localStorage.getItem('token'); // o sessionStorage, según dónde lo guardes

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.api_reservas_url, { headers }).pipe(
      map((data) => ({ data } as unknown as ApiResponse<ReservaResponse[]>)),
      catchError(this.handleError)
    );

  }

  private handleError(error: any) {
    let errorMessage = 'Ocurrió un error';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del backend
      errorMessage = error.error?.mensaje || `Error al procesar la reserva.`;
    }

    return throwError(() => new Error(errorMessage));
  }
  
}
