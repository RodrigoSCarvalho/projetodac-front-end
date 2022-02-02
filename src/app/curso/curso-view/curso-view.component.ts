import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Curso } from 'src/app/models/Curso';
import { CursoService } from 'src/app/services/curso.service';
import { Location } from '@angular/common';
import { Recurso } from 'src/app/models/Recurso';
import { RecursoService } from 'src/app/services/recurso.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-curso-view',
  templateUrl: './curso-view.component.html',
  styleUrls: ['./curso-view.component.css'],
})
export class CursoViewComponent implements OnInit {
  form!: FormGroup;
  submmited = false;
  editId!: number;
  recursos: Recurso[] = [];
  res: Recurso[] = [];
  associarRecurso= false;
  recursoId!: number;
  cursoId!: number;
  private readonly notifier: NotifierService

  constructor(
    private formBuilder: FormBuilder,
    private _cursoService: CursoService,
    private _location: Location,
    private route: ActivatedRoute,
    private _router: Router,
    private _recursoService: RecursoService,
    notifierService: NotifierService,
  ) {this.notifier = notifierService;}

  ngOnInit(): void {
    this.cursoId = this.route.snapshot.params['id'];    




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


    this.retrieveAllRecursosLivres();
    this.retrieveRecursos();
    
  }

  onSubmit(): void {
    this.submmited = true;
    if (this.form.valid) {
        if(this.associarRecurso == true){
        this._cursoService.postRecursoCurso(this.form.value, this.recursoId).subscribe(
          (success) => {
            this.closePopup();
            this.associarRecurso=false;
            this.form.reset();
            window.location.reload();
            this.notifier.notify('success', "Recurso associado com sucesso!");
          },
          (error) => console.log(error),
          () => console.log('request OK')
        );

      }
    }
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

  retrieveRecursos(): void {
    this._cursoService.loadCursosRecursos(this.editId).subscribe({
      next: (recurso: any) => {
        this.recursos = recurso;
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

  onChoice(): void {
    this.associarRecurso = !this.associarRecurso;
    if (this.associarRecurso) {
      this.openPopup();
    }
    console.log(this.associarRecurso);
  }
  
  retrieveAllRecursosLivres(): void {
    this._cursoService.retrieveAllRecursosLivres().subscribe({
      next: (r: any) => {
        this.res = r;
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

  onChange(id: number) {
    this.recursoId = id;
  }

  displayStyle = 'none';

  openPopup(): void {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  onRemove(recurso: number) {
    this._recursoService.desassociarRecursoColecao(recurso, this.cursoId).subscribe(
      (success) => {
        this.notifier.notify('success', "Recurso desassociado com sucesso!");
        window.location.reload();
      },(error) => console.log(error),
      () => console.log('request OK')
    );}
}
