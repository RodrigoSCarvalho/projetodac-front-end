import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { map, switchMap } from 'rxjs';
import { Autor } from 'src/app/models/Autor';
import { Recurso } from 'src/app/models/Recurso';
import { AutorService } from 'src/app/services/autor.service';
import { RecursoService } from 'src/app/services/recurso.service';

@Component({
  selector: 'app-recurso-add',
  templateUrl: './recurso-add.component.html',
  styleUrls: ['./recurso-add.component.css'],
  template: ` <notifier-container></notifier-container> `,
})
export class RecursoAddComponent implements OnInit {
  autores: Autor[] = [];
  autoresDisponiveis: Autor[] = [];
  autorId!: number;
  palavrasChave: string[] = [];
  _value!: string[];
  recursoId: number = 0;
  isEdit: boolean = false;
  associarAutor = false;
  criacao!: number;
  registro!: number;
  dataValid: boolean = true;
  dataRegex: string = '^d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$';
  private readonly notifier: NotifierService;

  constructor(
    private _autorService: AutorService,
    private formBuilder: FormBuilder,
    private _recursoService: RecursoService,
    private _location: Location,
    private route: ActivatedRoute,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  form!: FormGroup;
  submmited = false;
  @ViewChild('palavras') inputPalavras: any;

  ngOnInit(): void {
    this.recursoId = this.route.snapshot.params['id'];

    if (this.criacao > this.registro) {
      this.dataValid = false;
    }

    if (this.recursoId === undefined) {
      this.recursoId = 0;
    }

    this.associarAutor;

    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this._recursoService.loadById(id))
      )
      .subscribe((recurso) => this.updateForm(recurso));

    this.hasId();

    this.retrieveOutrosAutores();

    this.retrieveAllAutores();

    this.retrievePalavrasChave();

    this.form = this.formBuilder.group({
      id: [null],
      titulo: [null, [Validators.minLength(2), Validators.maxLength(200)]],
      descricao: [null, [Validators.minLength(2), Validators.maxLength(400)]],
      palavras_chave: [this.palavrasChave],
      imagem: [null, [Validators.minLength(2)]],
      link: [null, [Validators.minLength(2)]],
      data_criacao: [null, [Validators.minLength(8), Validators.maxLength(10)]],
      data_registro: [
        null,
        [Validators.minLength(8), Validators.maxLength(10)],
      ],
    });
  }

  updateForm(recurso: Recurso): void {
    this.form.patchValue({
      id: recurso.id,
      titulo: recurso.titulo,
      palavras_chave: recurso.palavras_chave,
      descricao: recurso.descricao,
      imagem: recurso.imagem,
      link: recurso.link,
      data_criacao: recurso.data_criacao,
      data_registro: recurso.data_registro,
    });
  }

  onSubmit(): void {
    this.submmited = true;
    if (this.form.valid) {
      if (this.associarAutor == false) {
        if (this.isEdit) {
          this.form.patchValue({ palavras_chave: this.palavrasChave });
          this._recursoService
            .updateRecurso(this.recursoId, this.form.value)
            .subscribe(
              (success) => {
                this._location.back();
                this.notifier.notify(
                  'success',
                  'Recurso alterado com sucesso!'
                );
              },
              (error) => console.log(error),
              () => console.log('request OK')
            );
        } else {
          this.form.patchValue({ palavras_chave: this.palavrasChave });
          this._recursoService
            .saveRecurso(this.autorId, this.form.value)
            .subscribe(
              (success) => {
                this._location.back();
                this.notifier.notify(
                  'success',
                  'Recurso cadastrado com sucesso!'
                );
              },
              (error) => console.log(error),
              () => console.log('request OK')
            );
        }
      } else {
        this.form.patchValue({ palavras_chave: this.palavrasChave });
        this._recursoService
          .saveRecursoComNovoAutor(
            this.autorId,
            this.recursoId,
            this.form.value
          )
          .subscribe(
            (success) => {
              this._location.back();
              this.notifier.notify('success', 'Recurso alterado com sucesso!');
            },
            (error) => console.log(error),
            () => console.log('request OK')
          );
      }
    }
  }
  onCancel(): void {
    this.submmited = false;
    this.form.reset();
  }

  onChange(id: number) {
    this.autorId = id;
  }

  removePalavras(): void {
    if (this.palavrasChave.length > 0) {
      this.palavrasChave.splice(-1);
      this.notifier.notify(
        'default',
        '??ltima palavra-chave removida com sucesso!'
      );
    }
  }

  cleanPalavras(): void {
    if (this.palavrasChave.length > 0) {
      this.palavrasChave = [];
      this.notifier.notify('error', 'Palavras-chave limpas com sucesso!');
    }
  }

  retrieveAllAutores(): void {
    this._autorService.retrieveAll().subscribe({
      next: (autor: any) => {
        this.autores = autor;
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

  retrieveOutrosAutores(): void {
    this._autorService.retrieveOutrosAutores(this.recursoId).subscribe({
      next: (autor: any) => {
        this.autoresDisponiveis = autor;
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

  retrievePalavrasChave(): void {
    this._recursoService.retrievePalavrasChave(this.recursoId).subscribe({
      next: (palavraChave: string[]) => {
        this.palavrasChave = palavraChave;
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

  hasId(): void {
    if (
      this.recursoId == 0 ||
      this.recursoId == null ||
      this.recursoId === undefined
    ) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  onChoice(): void {
    this.associarAutor = !this.associarAutor;
  }

  addPalavras(palavra: string) {
    this.palavrasChave.push(palavra);
    this.inputPalavras.nativeElement.value = '';
    let notifica = 'Palavra: ' + palavra + ' adicionada com sucesso!';
    this.notifier.notify('success', notifica);
  }

  get value(): string[] {
    return this._value;
  }
  set value(value: string[]) {
    this._value = value;
  }

  getBack(): void {
    this._location.back();
  }

  handleDataCriacao(data_criacao: string) {
    let criacaoReplace = data_criacao.replace('-', '');
    this.criacao = parseInt(criacaoReplace.replace('-', ''));

    if (this.criacao > this.registro) {
      this.dataValid = false;
    } else {
      this.dataValid = true;
    }
  }
  handleDataRegistro(data_registro: string) {
    let registroReplace = data_registro.replace('-', '');
    this.registro = parseInt(registroReplace.replace('-', ''));
    if (this.criacao > this.registro) {
      this.dataValid = false;
    } else {
      this.dataValid = true;
    }
  }

  get dataCriacao() {
    return this.form.get('data_criacao');
  }

  get dataRegistro() {
    return this.form.get('data_registro');
  }
}
