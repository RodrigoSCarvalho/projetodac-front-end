import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {


constructor(private httpClient: HttpClient) {}
private eventoUrl='http://localhost:8080/evento/recentes'

retrieveAll(): Observable<Evento>{
  return this.httpClient.get<Evento>(this.eventoUrl);
}

}
