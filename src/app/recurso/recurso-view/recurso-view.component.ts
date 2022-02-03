import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecursoService } from 'src/app/services/recurso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Recurso } from 'src/app/models/Recurso';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/Curso';
import { NotifierService } from 'angular-notifier';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/models/Evento';

@Component({
  selector: 'app-recurso-view',
  templateUrl: './recurso-view.component.html',
  styleUrls: ['./recurso-view.component.css'],
})
export class RecursoViewComponent implements OnInit {
  form!: FormGroup;
  submmited = false;
  colecao = 0;
  editId!: number;
  Id!: number;
  cursos: Curso[] = [];
  eventos: Evento[] = [];
  private readonly notifier: NotifierService;

  constructor(
    private formBuilder: FormBuilder,
    private _recursoService: RecursoService,
    private _location: Location,
    private route: ActivatedRoute,
    private _router: Router,
    private _cursoService: CursoService,
    private _eventoService: EventoService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this._recursoService.loadById(id))
      )
      .subscribe((recurso) => this.updateForm(recurso));

    this.route.params.subscribe((params) => (this.editId = params['id']));

    this.retrieveCursosLivres();
    this.retrieveEventosLivres();

    this.form = this.formBuilder.group({
      titulo: [null, [Validators.minLength(2), Validators.maxLength(200)]],
      descricao: [null, [Validators.minLength(2), Validators.maxLength(400)]],
      imagem: [null, [Validators.minLength(2)]],
      palavras_chave: [],
      link: [null, [Validators.minLength(2)]],
      data_criacao: [null, [Validators.minLength(8), Validators.maxLength(12)]],
      data_registro: [
        null,
        [Validators.minLength(8), Validators.maxLength(12)],
      ],

      
    });
    console.log(this.cursos);
    console.log("colecao: " + this.colecao);
  }

  updateForm(recurso: Recurso): void {
    this.form.patchValue({
      id: recurso.id,
      titulo: recurso.titulo,
      descricao: recurso.descricao,
      imagem: recurso.imagem,
      palavras_chave: recurso.palavras_chave,
      link: recurso.link,
      data_criacao: recurso.data_criacao,
      data_registro: recurso.data_registro,
    });
  }

  onEdit(): void {
    this._router.navigate(['editar', this.editId], {
      relativeTo: this.route.parent,
    });
  }

  retrieveCursosLivres(): void {
    this._recursoService.retrieveIdDeCursosLivres().subscribe({
      next: (id: any) => {
        for (let i = 0; i < id.length; i++) {
          this._cursoService.loadById(id[i]).subscribe({
            next: (curso: any) => {
              this.cursos.push(curso);
            },
            error: (err) => {
              alert('Error: ' + err);
            },
          });
        }
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

  retrieveEventosLivres(): void {
    this._recursoService.retrieveIdDeEventosLivres().subscribe({
      next: (id: any) => {
        for (let i = 0; i < id.length; i++) {
          this._eventoService.loadById(id[i]).subscribe({
            next: (evento: any) => {
              this.eventos.push(evento);
            },
            error: (err) => {
              alert('Error: ' + err);
            },
          });
        }
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

  onSubmit(): void {
    this.submmited = true;
    if (this.form.valid) {
      this._recursoService
        .associarRecursoColecao(this.editId, this.Id)
        .subscribe(
          (success) => {
            this.colecao = 0;
            this.form.reset();
            this.notifier.notify('success', 'Recurso associado com sucesso!');
          },
          (error) => console.log(error),
          () => console.log('request OK')
        );
    }
  }

  onChoice(event: any): void {
    console.log("Evento: " + event);
    console.log(event);
    this.colecao = event;
    
  }
  onChange(id: number) {
    this.Id = id;
  }

  colecoes = [
    {name: 'Sim, associar a um curso', id :1},
    {name: 'Sim, associar a um evento.', id: 2}
  ];
}
