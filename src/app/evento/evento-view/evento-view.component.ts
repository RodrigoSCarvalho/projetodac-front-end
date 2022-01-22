import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-evento-view',
  templateUrl: './evento-view.component.html',
  styleUrls: ['./evento-view.component.css'],
})
export class EventoViewComponent implements OnInit {
  form!: FormGroup;
  submmited = false;
  editId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private _eventoService: EventoService,
    private _location: Location,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
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

  onEdit(): void {
    this._router.navigate(['editar', this.editId], {
      relativeTo: this.route.parent,
    });
  }
}
