import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {


  private baseUrl = 'http://localhost:8080/api/application';
  constructor(private http : HttpClient) { }

  apply(internshipId: number, studentId: number) {
  return this.http.post(this.baseUrl, {
    internshipId,
    studentId
  });
}
}
