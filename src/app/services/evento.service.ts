import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {


  constructor(private httpClient: HttpClient) { }
  private eventoRecentUrl = 'http://localhost:8080/evento/recentes'
  private eventoUrl = 'http://localhost:8080/evento'

  retrieveRecents(): Observable<Evento> {
    return this.httpClient.get<Evento>(this.eventoRecentUrl);
  }
  retrieveAll(): Observable<Evento> {
    return this.httpClient.get<Evento>(this.eventoUrl);
  }

  deleteEvento(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.eventoUrl}/${id}`);
  }


}
