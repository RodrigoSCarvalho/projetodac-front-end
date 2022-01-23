import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
})
export class EventoComponent implements OnInit {
  constructor(
    private _eventoService: EventoService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  deleteId!: number;
  eventoTitulo!: string;
  evento: Evento = new Evento();
  eventos: Evento[] = [];

  ngOnInit(): void {
    this.retrieveAllEventos();
  }

  retrieveAllEventos(): void {
    this._eventoService.retrieveAll().subscribe({
      next: (evento: any) => {
        this.eventos = evento;
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

  deleteEventos() {
    this._eventoService.deleteEvento(this.deleteId).subscribe((next) => {
      this.ngOnInit();
      this.closePopup();
    });
  }

  displayStyle = 'none';

  openPopup(id: number, titulo: string): void {
    this.eventoTitulo = titulo;
    this.deleteId = id;
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  onView(id: number): void {
    this._router.navigate(['view', id], { relativeTo: this.route });
  }
}
