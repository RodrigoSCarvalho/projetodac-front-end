import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Autor } from 'src/app/models/Autor';
import { AutorService } from 'src/app/services/autor.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs';
import { Recurso } from 'src/app/models/Recurso';
import { NotifierService } from 'angular-notifier';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';

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
  private readonly notifier: NotifierService;
  public options!: Options;
  public exampleData!: Array<Select2OptionData>;

  
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

    this.exampleData = [
      {
        id: 'multiple1',
        text: 'Multiple 1'
      },
      {
        id: 'multiple2',
        text: 'Multiple 2'
      },
      {
        id: 'multiple3',
        text: 'Multiple 3'
      },
      {
        id: 'multiple4',
        text: 'Multiple 4'
      }
    ];

    this.options = {
      width: '300',
      multiple: true,
      tags: true
    }

    this._value = ['multiple2', 'multiple4'];

    if (this.recursoId === undefined) {
      this.recursoId = 0;
    }

    this.associarAutor;
    console.log(this.associarAutor);

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
      data_criacao: [null, [Validators.minLength(8), Validators.maxLength(12)]],
      data_registro: [
        null,
        [Validators.minLength(8), Validators.maxLength(12)],
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
    console.log(this.associarAutor);
    this.submmited = true;
    if (this.form.valid) {
      if (this.associarAutor == false) {
        if (this.isEdit) {
          this.form.patchValue({ palavras_chave: this.palavrasChave });
          console.log('submit: ' + this.palavrasChave);
          this._recursoService
            .updateRecurso(this.recursoId, this.form.value)
            .subscribe(
              (success) => {
                this._location.back();
                this.notifier.notify('success', "Recurso alterado com sucesso!");
              },
              (error) => console.log(error),
              () => console.log('request OK')
            );
        } else {
          console.log('submit: ' + this.palavrasChave);
          this.form.patchValue({ palavras_chave: this.palavrasChave });
          this._recursoService          
            .saveRecurso(this.autorId, this.form.value)
            .subscribe(
              (success) => {
                this._location.back();
                this.notifier.notify('success', "Recurso cadastrado com sucesso!");
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
              this.notifier.notify('success', "Recurso alterado com sucesso!");
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
      this.notifier.notify('default', "Última palavra-chave removida com sucesso!");
    }
  }

  cleanPalavras(): void {
    if (this.palavrasChave.length > 0) {
      this.palavrasChave = [];
      this.notifier.notify('error', "Palavras-chave limpas com sucesso!");
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
    console.log(this.recursoId);
    this._recursoService.retrievePalavrasChave(this.recursoId).subscribe({
      next: (palavraChave: string[]) => {
        this.palavrasChave = palavraChave;
        console.log('Palavra Chave Retrieve: ' + this.palavrasChave);
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
    console.log(this.associarAutor);
  }

  addPalavras(palavra: string) {
    console.log(palavra);
    this.palavrasChave.push(palavra);
    console.log(this.palavrasChave);
    this.inputPalavras.nativeElement.value = '';
    let notifica = "Palavra: " +palavra+ " adicionada com sucesso!" 
    this.notifier.notify('success', notifica);
  }

  get value(): string[] {
    return this._value;
  }
  set value(value: string[]) {
    console.log('Set value: ' + value);
    this._value = value;
  }

  getBack(): void {
    this._location.back();
  }

}
