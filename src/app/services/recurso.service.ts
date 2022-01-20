import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recurso } from '../models/Recurso';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  constructor(private httpClient: HttpClient) {}
  private recursoRecentUrl='http://localhost:8080/recurso/recentes'
  private recursoUrl='http://localhost:8080/recurso'

  retrieveRecents(): Observable<Recurso>{
    return this.httpClient.get<Recurso>(this.recursoRecentUrl);
  }

  retrieveAll(): Observable<Recurso>{
    return this.httpClient.get<Recurso>(this.recursoUrl);
  }

  deleteRecursos(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.recursoUrl}/${id}`);
  }
}
