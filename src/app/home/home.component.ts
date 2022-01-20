import { Component, OnInit } from '@angular/core';
import { Curso } from '../models/Curso';
import { Evento } from '../models/Evento';
import { Recurso } from '../models/Recurso';
import { CursoService } from '../services/curso.service';
import { EventoService } from '../services/evento.service';
import { RecursoService } from '../services/recurso.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _recursoService: RecursoService, private _eventosService: EventoService, private _cursoService: CursoService) { }

  recursos: Recurso[] = [];
  eventos: Evento[] = [];
  cursos: Curso[] = [];

  title = 'projetodevappcorp-front-end';
  ngOnInit(): void {this.retrieveAllRecursos(), this.retrieveAllEventos(), this.retrieveAllCursos()};

  retrieveAllRecursos(): void {
    this._recursoService.retrieveRecents().subscribe({
      next: (recurso: any)=> {
      this.recursos = recurso;
    },
    error: (err) => {
      alert('Error: ' + err);
    },});
  }

  retrieveAllEventos(): void {
    this._eventosService.retrieveAll().subscribe({
      next: (evento: any)=> {
      this.eventos = evento;
    },
    error: (err) => {
      alert('Error: ' + err);
    },});
  }

    retrieveAllCursos(): void {
      this._cursoService.retrieveAll().subscribe({
        next: (curso: any)=> {
        this.cursos = curso;
      },
      error: (err) => {
        alert('Error: ' + err);
      },});
  }
}
