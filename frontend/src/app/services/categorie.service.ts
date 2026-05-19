import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = `${environment.apiUrl}/${environment.prefix}/categories`;

  constructor(private http: HttpClient) {}

  getListCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCategorieById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  postCategorie(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateCategorie(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteCategorie(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}