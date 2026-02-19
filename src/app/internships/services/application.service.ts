import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http : HttpClient) { }

  apply(internshipId: number, studentId: number) {
  return this.http.post('/api/application', {
    internshipId,
    studentId
  });
}
}
