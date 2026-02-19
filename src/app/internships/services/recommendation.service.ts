import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recommendation } from '../../models/Recommendation';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private baseUrl = "http://localhost:8080/api/recommendation/";
  

  constructor(private http : HttpClient) { }

 getRecommendations(studentId : number) : Observable<Recommendation[]>
 {
  return this.http.get<Recommendation[]>(this.baseUrl + studentId);
 }
}
