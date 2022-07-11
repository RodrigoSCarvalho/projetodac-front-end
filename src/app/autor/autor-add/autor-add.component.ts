import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recurso } from 'src/app/models/Recurso';
import { NotifierService } from 'angular-notifier';
import { AutorService } from 'src/app/services/autor.service';
import { ActivatedRoute } from '@angular/router';
import { RecursoService } from 'src/app/services/recurso.service';
import { map, switchMap } from 'rxjs';
import { Autor } from 'src/app/models/Autor';

@Component({
  selector: 'app-autor-add',
  templateUrl: './autor-add.component.html',
  styleUrls: ['./autor-add.component.css'],
})
export class AutorAddComponent implements OnInit {
  form!: FormGroup;
  submmited = false;
  recursos: Recurso[] = [];
  private readonly notifier: NotifierService;

  constructor(
    private formBuilder: FormBuilder,
    private _autorService: AutorService,
    private _location: Location,
    private route: ActivatedRoute,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this._autorService.loadById(id))
      )
      .subscribe((curso) => this.updateForm(curso));

    this.form = this.formBuilder.group({
      id: [null],
      orcid: [null, [Validators.minLength(16), Validators.maxLength(19)]],
      nome: [null, [Validators.minLength(2), Validators.maxLength(200)]],
      sobrenome: [null, [Validators.minLength(2), Validators.maxLength(400)]],
      email: [
        null,
        [Validators.minLength(3), Validators.maxLength(400), Validators.email],
      ],
      afiliacao: [null, [Validators.minLength(2)]],
    });
  }

  updateForm(autor: Autor): void {
    this.form.patchValue({
      id: autor.id,
      orcid: autor.orcid,
      nome: autor.nome,
      sobrenome: autor.sobrenome,
      email: autor.email,
      afiliacao: autor.afiliacao,
    });
  }

  onSubmit(): void {
    this.submmited = true;
    if (this.form.valid) {
      this._autorService.postAutor(this.form.value).subscribe(
        (success) => {
          this._location.back();
          this.notifier.notify('success', 'Autor salvo com sucesso!');
        },
        (error) => console.log(error),
        () => console.log('request OK')
      );
    }
  }
  onCancel(): void {
    this.submmited = false;
    this.form.reset();
  }

  get orcid() {
    return this.form.get('orcid');
  }

  getBack(): void {
    this._location.back();
  }
}
