import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoService } from 'src/app/services/evento.service';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/models/Evento';
import { RecursoService } from 'src/app/services/recurso.service';
import { Recurso } from 'src/app/models/Recurso';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-evento-add',
  templateUrl: './evento-add.component.html',
  styleUrls: ['./evento-add.component.css'],
})
export class EventoAddComponent implements OnInit {
  form!: FormGroup;
  submmited = false;
  associarRecurso = false;
  recursoId!: number;
  recursos: Recurso[] = [];
  criacao!: number;
  fim!: number;
  dataValid: boolean = true;
  private readonly notifier: NotifierService;

  constructor(
    private formBuilder: FormBuilder,
    private _eventoService: EventoService,
    private _location: Location,
    private route: ActivatedRoute,
    private _recursoService: RecursoService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.retrieveAllRecursos();

    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this._eventoService.loadById(id))
      )
      .subscribe((evento) => this.updateForm(evento));

    this.form = this.formBuilder.group({
      id: [null],
      titulo: [null, [Validators.minLength(2), Validators.maxLength(200)]],
      descricao: [null, [Validators.minLength(2), Validators.maxLength(400)]],
      imagem: [null, [Validators.minLength(2)]],
      data_criacao: [null, [Validators.minLength(8), Validators.maxLength(10)]],
      data_fim: [null, [Validators.minLength(8), Validators.maxLength(10)]],
    });
  }

  updateForm(evento: Evento): void {
    this.form.patchValue({
      id: evento.id,
      titulo: evento.titulo,
      descricao: evento.descricao,
      imagem: evento.imagem,
      data_criacao: evento.data_criacao,
      data_fim: evento.data_fim,
    });
  }

  onSubmit(): void {
    this.submmited = true;
    if (this.form.valid) {
      if (this.associarRecurso == false) {
        this._eventoService.postEvento(this.form.value).subscribe(
          (success) => {
            this._location.back();
            this.notifier.notify('success', 'Evento salvo com sucesso!');
          },
          (error) => console.log(error),
          () => console.log('request OK')
        );
      } else {
        this._eventoService
          .postRecursoEvento(this.form.value, this.recursoId || 0)
          .subscribe(
            (success) => {
              this._location.back();
              this.notifier.notify('success', 'Evento salvo com sucesso!');
            },
            (error) => console.log(error),
            () => console.log('request OK')
          );
      }
    }
    if (this.criacao > this.fim) {
      this.dataValid = false;
    }
  }
  onCancel(): void {
    this.submmited = false;
    this.form.reset();
  }

  onChoice(): void {
    this.associarRecurso = !this.associarRecurso;
    console.log(this.associarRecurso);
  }

  retrieveAllRecursos(): void {
    this._eventoService.retrieveAllRecursosLivres().subscribe({
      next: (recurso: any) => {
        this.recursos = recurso;
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

  onChange(id: number) {
    this.recursoId = id;
  }

  handleDataCriacao(data_criacao: string) {
    let criacaoReplace = data_criacao.replace('-', '');
    this.criacao = parseInt(criacaoReplace.replace('-', ''));

    if (this.criacao > this.fim) {
      this.dataValid = false;
    } else {
      this.dataValid = true;
    }
  }
  handleDataFim(data_fim: string) {
    let fimReplace = data_fim.replace('-', '');
    this.fim = parseInt(fimReplace.replace('-', ''));
    if (this.criacao > this.fim) {
      this.dataValid = false;
    } else {
      this.dataValid = true;
    }
  }

  get dataCriacao() {
    return this.form.get('data_criacao');
  }

  get dataFim() {
    return this.form.get('data_fim');
  }

  getBack(): void {
    this._location.back();
  }
}
