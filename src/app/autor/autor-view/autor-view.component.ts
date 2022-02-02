import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recurso } from 'src/app/models/Recurso';
import { AutorService } from 'src/app/services/autor.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Autor } from 'src/app/models/Autor';

@Component({
  selector: 'app-autor-view',
  templateUrl: './autor-view.component.html',
  styleUrls: ['./autor-view.component.css']
})
export class AutorViewComponent implements OnInit {
  form!: FormGroup;
  submmited = false;
  editId!: number;
  recursos: Recurso[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _autorService: AutorService,
    private _location: Location,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: any) => params['id']),

        switchMap((id) => this._autorService.loadById(id))
      )
      .subscribe((autor) => this.updateForm(autor));

    this.route.params.subscribe((params) => (this.editId = params['id']));

    this.form = this.formBuilder.group({
      id: [null],
      orcid: [null],
      nome: [null, [Validators.minLength(2), Validators.maxLength(200)]],
      sobrenome: [null, [Validators.minLength(2), Validators.maxLength(400)]],
      email: [null, [Validators.minLength(2), Validators.maxLength(400)]],
      afiliacao: [null, [Validators.minLength(2)]],
    });

    this.retrieveRecursos()
  }

  updateForm(autor: Autor): void {
    this.form.patchValue({
      id: autor.id,
      orcid: autor.orcid,
      nome: autor.nome,
      sobrenome: autor.sobrenome,
      email: autor.email,
      afiliacao: autor.afiliacao
    });
  }

  onEdit(): void {
    this._router.navigate(['editar', this.editId], {
      relativeTo: this.route.parent,
    });
  }

  retrieveRecursos(): void {
    this._autorService.loadAutorRecursos(this.editId).subscribe({
      next: (recurso: any) => {
        this.recursos = recurso;
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

}