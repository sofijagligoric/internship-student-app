import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cv } from '../../models/Cv';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/api/cv';
  private currentUserCv: Cv | null = null;

  create(cv: Cv, image?: File): Observable<Cv> {
    const formData = new FormData();
    formData.append('cv', JSON.stringify(cv));

    if (image) {
      formData.append('image', image);
    }
    return this.http.post<Cv>(this.baseUrl, formData);
  }

  update(id: number, cv: Cv, image?: File): Observable<Cv> {
    const formData = new FormData();
    formData.append('cv', JSON.stringify(cv));

    if (image) {
      formData.append('image', image);
    }
    return this.http.put<Cv>(`${this.baseUrl}/${id}`, formData);
  }

  getById(id: number): Observable<Cv> {
    return this.http.get<Cv>(`${this.baseUrl}/${id}`);
  }

  getByStudent(studentId: number): Observable<Cv> {
    return this.http.get<Cv>(`${this.baseUrl}/student/${studentId}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  setCurrentUserCv(cv: Cv) {
    this.currentUserCv = cv;
  }

  getCurrentUserCv(): Cv | null {
    return this.currentUserCv;
  }

  clearCurrentUserCv() {
    this.currentUserCv = null;
  }
}
