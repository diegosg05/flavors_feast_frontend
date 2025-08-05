import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserProfile, UserRegister } from '../interfaces/user';
import { ApiResponse } from '../interfaces/ApiResponse';
import { catchError, map, Observable, throwError } from 'rxjs';
import Token from '../interfaces/token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080/api/v2/login';
  private readonly API_REGISTER_URL = 'http://localhost:8080/api/v2/register';
  private readonly API_PROFILE_URL = 'http://localhost:8080/api/auth/v2/profile';

  constructor(private http: HttpClient) {}

  loginUser(user: UserLogin): Observable<ApiResponse<Token>> {
    return this.http.post<UserLogin>(this.API_URL, user).pipe(
      map((data) => ({ data } as unknown as ApiResponse<Token>)),
      catchError(this.handleError)
    );
  }

  registerUser(user: UserRegister): Observable<ApiResponse<Token>> {
    return this.http.post<UserRegister>(this.API_REGISTER_URL, user).pipe(
      map((data) => ({ data } as unknown as ApiResponse<Token>)),
      catchError(this.handleError)
    );
  }

  getUserProfile(): Observable<ApiResponse<UserProfile>> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserProfile>(this.API_PROFILE_URL, { headers }).pipe(
      map((data) => ({ data } as unknown as ApiResponse<UserProfile>)),
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
      errorMessage = error.error?.mensaje || `Error al iniciar sesión.`;
    }

    return throwError(() => error);
  }
}
