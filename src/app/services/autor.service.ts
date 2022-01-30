import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Autor } from '../models/Autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private httpClient: HttpClient) {}
  private autorRecentUrl='http://localhost:8080/author/recentes'
  private autorUrl='http://localhost:8080/author'
  private recursoUrl='http://localhost:8080/recurso'

  retrieveRecents(): Observable<Autor>{
    return this.httpClient.get<Autor>(this.autorRecentUrl);
  }

  retrieveAll(): Observable<Autor>{
    return this.httpClient.get<Autor>(this.autorUrl);
  }

  deleteAutor(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.autorUrl}/${id}`);
  }

  retrieveOutrosAutores(id: number): Observable<any> {
    return this.httpClient.get<Autor>(`${this.recursoUrl}/${id}/autores`);
  }
}
