import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../../models/Application';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private baseUrl = 'http://localhost:8080/api/application';
  constructor(private http: HttpClient) {}

 apply(internshipId: number, studentId: number) {
  return this.http.post(this.baseUrl, null, {
    params: {
      studentId: studentId,
      internshipId: internshipId,
    },
  });
}
  getByStudent(id: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/student/all/${id}`);
  }

  getByStudentAndStatus(
    studentId: number,
    status: string,
  ): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/view/s/status`, {
      params: {
        studentId: studentId,
        status: status,
      },
    });
  }
}
