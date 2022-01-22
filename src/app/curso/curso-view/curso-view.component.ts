import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Curso } from 'src/app/models/Curso';
import { CursoService } from 'src/app/services/curso.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-curso-view',
  templateUrl: './curso-view.component.html',
  styleUrls: ['./curso-view.component.css'],
})
export class CursoViewComponent implements OnInit {
  form!: FormGroup;
  submmited = false;
  editId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private _cursoService: CursoService,
    private _location: Location,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: any) => params['id']),

        switchMap((id) => this._cursoService.loadById(id))
      )
      .subscribe((curso) => this.updateForm(curso));

    this.route.params.subscribe((params) => (this.editId = params['id']));

    this.form = this.formBuilder.group({
      id: [null],
      titulo: [null, [Validators.minLength(2), Validators.maxLength(200)]],
      descricao: [null, [Validators.minLength(2), Validators.maxLength(400)]],
      imagem: [null, [Validators.minLength(2)]],
      data_registro: [
        null,
        [Validators.minLength(8), Validators.maxLength(12)],
      ],
    });
  }

  updateForm(curso: Curso): void {
    this.form.patchValue({
      id: curso.id,
      titulo: curso.titulo,
      descricao: curso.descricao,
      imagem: curso.imagem,
      data_registro: curso.data_registro,
    });
  }

  onEdit(): void {
    this._router.navigate(['editar', this.editId], {
      relativeTo: this.route.parent,
    });
  }
}
