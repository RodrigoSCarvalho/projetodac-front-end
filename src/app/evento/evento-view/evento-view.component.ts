import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';
import { Location } from '@angular/common';
import { Recurso } from 'src/app/models/Recurso';
import { RecursoService } from 'src/app/services/recurso.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-evento-view',
  templateUrl: './evento-view.component.html',
  styleUrls: ['./evento-view.component.css'],
})
export class EventoViewComponent implements OnInit {
  form!: FormGroup;
  submmited = false;
  editId!: number;
  eventos: Evento[] = [];
  recursos: Recurso[] = [];
  res: Recurso[] = [];
  eventoId!: number;
  private readonly notifier: NotifierService
  associarRecurso = false;
  recursoId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private _eventoService: EventoService,
    private _location: Location,
    private route: ActivatedRoute,
    private _router: Router,
    private _recursoService: RecursoService,
    notifierService: NotifierService
  ) {this.notifier = notifierService}

  ngOnInit(): void {
    
    this.eventoId = this.route.snapshot.params['id'];   

    this.retrieveAllRecursosLivres();
    
    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this._eventoService.loadById(id))
      )
      .subscribe((evento) => this.updateForm(evento));

    this.route.params.subscribe((params) => (this.editId = params['id']));

    this.form = this.formBuilder.group({
      id: [null],
      titulo: [null, [Validators.minLength(2), Validators.maxLength(200)]],
      descricao: [null, [Validators.minLength(2), Validators.maxLength(400)]],
      imagem: [null, [Validators.minLength(2)]],
      data_criacao: [null, [Validators.minLength(8), Validators.maxLength(12)]],
      data_fim: [null, [Validators.minLength(8), Validators.maxLength(12)]],
    });

    this.retrieveRecursos();
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

  retrieveRecursos(): void {
    this._eventoService.loadEventosRecursos(this.editId).subscribe({
      next: (recurso: any) => {
        this.recursos = recurso;
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

  onEdit(): void {
    this._router.navigate(['editar', this.editId], {
      relativeTo: this.route.parent,
    });
  }

  onRemove(recurso: number) {
    this._recursoService.desassociarRecursoColecao(recurso, this.eventoId).subscribe(
      (success) => {
        this.notifier.notify('success', "Recurso desassociado com sucesso!");
        window.location.reload();
      },(error) => console.log(error),
      () => console.log('request OK')
    );}

    
  onChoice(): void {
    this.associarRecurso = !this.associarRecurso;
    console.log(this.associarRecurso);
  }
  onChange(id: number) {
    this.recursoId = id;
  }

  onSubmit(): void {
    this.submmited = true;
    if (this.form.valid) {
        if(this.associarRecurso == true){
        this._eventoService.postRecursoEvento(this.form.value, this.recursoId).subscribe(
          (success) => {
            this.associarRecurso=false;
            this.form.reset();
            this.notifier.notify('success', "Recurso associado com sucesso!");
          },
          (error) => console.log(error),
          () => console.log('request OK')
        );

      }
    }
  }
  retrieveAllRecursosLivres(): void {
    this._eventoService.retrieveAllRecursosLivres().subscribe({
      next: (r: any) => {
        this.res = r;
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }
}
