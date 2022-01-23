import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Recurso } from '../models/Recurso';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  constructor(private httpClient: HttpClient) {}
  private recursoRecentUrl='http://localhost:8080/recurso/recentes'
  private recursoUrl='http://localhost:8080/recurso'
  private addRecursoUrl='http://localhost:8080/author'

  retrieveRecents(): Observable<Recurso>{
    return this.httpClient.get<Recurso>(this.recursoRecentUrl);
  }

  retrieveAll(): Observable<Recurso>{
    return this.httpClient.get<Recurso>(this.recursoUrl);
  }

  deleteRecursos(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.recursoUrl}/${id}`);
  }

  saveRecurso(id: number, recurso: Recurso): Observable<any>{
    return this.httpClient.post<Recurso>(`${this.addRecursoUrl}/${id}/recurso`, recurso).pipe(take(1));
  }

  updateRecurso(id: number, recurso: Recurso): Observable<any>{
    return this.httpClient.put<Recurso>(`${this.recursoUrl}/${id}`, recurso).pipe(take(1));
  }

  loadById(id: number): Observable<any> {
    return this.httpClient.get<Recurso>(`${this.recursoUrl}/${id}`).pipe(take(1));
  }
}
