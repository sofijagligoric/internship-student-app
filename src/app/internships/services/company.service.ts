import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../../models/Company';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

   private baseUrl = 'http://localhost:8080/api/company';
     constructor(private http : HttpClient) { }
  
     getAll() : Observable<Company[]> {
      return this.http.get<Company[]>(this.baseUrl);
     }
  
    getById(id: number): Observable<Company> {
        return this.http.get<Company>(`${this.baseUrl}/${id}`);
      }
}
