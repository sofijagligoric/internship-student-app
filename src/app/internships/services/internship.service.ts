import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InternshipDTO } from '../../models/Internship';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  private baseUrl = 'http://localhost:8080/api/internship';
   constructor(private http : HttpClient) { }

   getAvailable() : Observable<InternshipDTO[]> {
    return this.http.get<InternshipDTO[]>(`${this.baseUrl}/available/all`);
   }

    getAll() : Observable<InternshipDTO[]> {
    return this.http.get<InternshipDTO[]>(`${this.baseUrl}/all`);
   }

  getById(id: number): Observable<InternshipDTO> {
      return this.http.get<InternshipDTO>(`${this.baseUrl}/view/${id}`);
    }
}
