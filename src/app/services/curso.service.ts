import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/Curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private httpClient: HttpClient) {}
  private cursoRecentUrl='http://localhost:8080/curso/recentes'
  private cursoUrl='http://localhost:8080/curso'
  
  retrieveRecents(): Observable<Curso>{
    return this.httpClient.get<Curso>(this.cursoRecentUrl);
  }

  retrieveAll(): Observable<Curso>{
    return this.httpClient.get<Curso>(this.cursoUrl);
  }

  deleteCurso(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.cursoUrl}/${id}`);
  }
}
