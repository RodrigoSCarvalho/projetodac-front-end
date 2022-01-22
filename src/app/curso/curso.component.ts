import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../models/Curso';
import { CursoService } from '../services/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  constructor(
    private _cursoService: CursoService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  deleteId!: number;
  curso: Curso = new Curso();
  cursos: Curso[] = [];

  ngOnInit(): void {
    this.retrieveAllCursos();
  }

  retrieveAllCursos(): void {
    this._cursoService.retrieveAll().subscribe({
      next: (curso: any) => {
        this.cursos = curso;
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

  deleteCursos() {
    this._cursoService.deleteCurso(this.deleteId).subscribe((next) => {
      this.ngOnInit();
      this.closePopup();
    });
  }

  displayStyle = 'none';

  openPopup(id: number): void {
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
