import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Autor } from '../models/Autor';
import { Recurso } from '../models/Recurso';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  constructor(private httpClient: HttpClient) {}
  private recursoRecentUrl='https://rest-api-recursos-educacionais.herokuapp.com/recurso/recentes'
  private recursoUrl='https://rest-api-recursos-educacionais.herokuapp.com/recurso'
  private addRecursoUrl='https://rest-api-recursos-educacionais.herokuapp.com/author'
  private desassociarUrl='https://rest-api-recursos-educacionais.herokuapp.com/desassociar'
  private associarUrl='https://rest-api-recursos-educacionais.herokuapp.com/associar'

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
  saveRecursoComNovoAutor(autorId: number, recursoId: number, recurso: Recurso): Observable<any>{
    return this.httpClient.put<Recurso>(`${this.addRecursoUrl}/${autorId}/recurso/${recursoId}`, recurso).pipe(take(1));
  }
  updateRecurso(id: number, recurso: Recurso): Observable<any>{
    return this.httpClient.put<Recurso>(`${this.recursoUrl}/${id}`, recurso).pipe(take(1));
  }

  loadById(id: number): Observable<any> {
    return this.httpClient.get<Recurso>(`${this.recursoUrl}/${id}`).pipe(take(1));
  }

  retrievePalavrasChave(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.recursoUrl}/${id}/palavraschave`).pipe(take(1));
  }

  retrieveIdDeCursosLivres(): Observable<any> {
    return this.httpClient.get<any>(`${this.recursoUrl}/cursos`).pipe(take(1));
  }

  retrieveIdDeEventosLivres(): Observable<any> {
    return this.httpClient.get<any>(`${this.recursoUrl}/eventos`).pipe(take(1));
  }

  desassociarRecursoColecao(recursoId: number, colecaoId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.desassociarUrl}/${colecaoId}/recurso/${recursoId}`).pipe(take(1));
  }

  associarRecursoColecao(recursoId: number, colecaoId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.associarUrl}/${colecaoId}/recurso/${recursoId}`).pipe(take(1));
  }
}
