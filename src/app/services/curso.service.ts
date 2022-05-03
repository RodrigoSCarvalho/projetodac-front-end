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
  private cursoRecentUrl='https://rest-api-recursos-educacionais.herokuapp.com/curso/recentes'
  private cursoUrl='https://rest-api-recursos-educacionais.herokuapp.com/curso'
  private associateCursoEventoUrl='https://rest-api-recursos-educacionais.herokuapp.com/recurso'
  

  
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

  postRecursoCurso(curso: Curso, recursoId: number): Observable<any> {
    return this.httpClient.post<Curso>(`${this.associateCursoEventoUrl}/${recursoId}/curso`, curso).pipe(take(1));
  }

  retrieveAllRecursosLivres(): Observable<Recurso> {
    return this.httpClient.get<Recurso>(`${this.cursoUrl}/recursos`);
  }

}
