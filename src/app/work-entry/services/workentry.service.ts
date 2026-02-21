import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workentry } from '../../models/Workentry';

@Injectable({
  providedIn: 'root'
})
export class WorkentryService {

    private baseUrl = 'http://localhost:8080/api/workentry';
  constructor(private http : HttpClient) { }

  getById(id: number): Observable<Workentry> {
      return this.http.get<Workentry>(`${this.baseUrl}/${id}`);
    }
  
    getByStudent(studentId: number): Observable<Workentry[]> {
      return this.http.get<Workentry[]>(`${this.baseUrl}/student/${studentId}`);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    create(cv: Workentry): Observable<Workentry> {
        return this.http.post<Workentry>(this.baseUrl, cv);
      }
  
}
