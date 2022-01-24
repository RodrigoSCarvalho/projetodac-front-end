import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Curso } from '../models/Curso';
import { Recurso } from '../models/Recurso';

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

  postCurso(curso: Curso): Observable<any> {
    return this.httpClient.post<Curso>(this.cursoUrl, curso).pipe(take(1));
  }

  loadById(id: number): Observable<any> {
    return this.httpClient.get<Curso>(`${this.cursoUrl}/${id}`).pipe(take(1));
  }

  loadCursosRecursos(id: number): Observable<any> {
    return this.httpClient.get<Recurso>(`${this.cursoUrl}/${id}/recursos`).pipe(take(1));
  }
}
