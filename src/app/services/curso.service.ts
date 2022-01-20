import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/Curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private httpClient: HttpClient) {}
  private eventoUrl='http://localhost:8080/curso/recentes'
  
  retrieveAll(): Observable<Curso>{
    return this.httpClient.get<Curso>(this.eventoUrl);
  }

}
