import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  private apiUrl = `${environment.apiUrl}/${environment.prefix}/recettes`;

  constructor(private http: HttpClient) {}

  getListRecettes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRecetteById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  postRecette(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateRecette(id: string, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteRecette(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}