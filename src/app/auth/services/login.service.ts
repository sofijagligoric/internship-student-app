import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   private baseUrl = 'http://localhost:8080/api/auth';
   public signedIn: boolean = false;
   public activeUser: LoginResponse|null = null;

  constructor(private http: HttpClient, private router : Router) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/login`,
      request
    );
  }

  setActiveUser(user: LoginResponse) {
  this.activeUser = user;
  this.signedIn = true;
  localStorage.setItem('activeUser', JSON.stringify(user));
}

  isLoggedIn(): boolean {
  return localStorage.getItem('userId') !== null;
}

  logout() {
    localStorage.clear();
    this.activeUser = null;
    this.signedIn = false;
    this.router.navigate(['/']);
  }
}
