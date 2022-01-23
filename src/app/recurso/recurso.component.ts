import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isThisTypeNode } from 'typescript';
import { Recurso } from '../models/Recurso';
import { RecursoService } from '../services/recurso.service';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css'],
})
export class RecursoComponent implements OnInit {
  constructor(
    private _recursoService: RecursoService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  recursoTitulo: string | undefined;
  deleteId!: number;
  recurso: Recurso = new Recurso();
  recursos: Recurso[] = [];

  ngOnInit(): void {
    this.retrieveAllRecursos();
  }

  retrieveAllRecursos(): void {
    this._recursoService.retrieveAll().subscribe({
      next: (recurso: any) => {
        this.recursos = recurso;
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

  deleteRecursos() {
    this._recursoService.deleteRecursos(this.deleteId).subscribe((next) => {
      this.ngOnInit();
      this.closePopup();
    });
  }

  displayStyle = 'none';

  openPopup(id: number, titulo: string | undefined): void {
    this.deleteId = id;
    this.recursoTitulo = titulo;
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  onView(id: number): void {
    this._router.navigate(['view', id], { relativeTo: this.route });
  }
}
