import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Autor } from 'src/app/models/Autor';
import { AutorService } from 'src/app/services/autor.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Recurso } from 'src/app/models/Recurso';

@Component({
  selector: 'app-recurso-edit',
  templateUrl: './recurso-edit.component.html',
  styleUrls: ['./recurso-edit.component.css']
})
export class RecursoEditComponent implements OnInit {
  autores: Autor[] = [];
  recursoId!: number;
  palavrasChave: string[] = [];
  recursos: Recurso[] = [];

  constructor(
    private _autorService: AutorService,
    private formBuilder: FormBuilder,
    private _recursoService: RecursoService,
    private _location: Location,
    private route: ActivatedRoute
  ) {}
  form!: FormGroup;
  submmited = false;
  @ViewChild('palavras') inputPalavras: any;
  criacao!: number;
  registro!: number;
  dataValid: boolean = true;

  ngOnInit(): void {
    this.recursoId = this.route.snapshot.params['id'];
    this.retrievePalavrasChave();
    
    this.retrieveAllAutores();
    this.retrieveRecurso();
    this.retrievePalavrasChave();

    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this._recursoService.loadById(id))
      )
      .subscribe((recurso) => this.updateForm(recurso));

    this.form = this.formBuilder.group({
      id: [null],
      titulo: [null, [Validators.minLength(2), Validators.maxLength(200)]],
      descricao: [null, [Validators.minLength(2), Validators.maxLength(400)]],
      palavras_chave: [this.palavrasChave] ,
      imagem: [null, [Validators.minLength(2)]],
      link: [null, [Validators.minLength(2)]],
      data_criacao: [
        null,
        [Validators.minLength(8), Validators.maxLength(12)],
      ],
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

  retrieveRecurso(): void {
    this._recursoService.loadById(this.recursoId).subscribe({
      next: (recurso: any) => {
        this.recursos = recurso;
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

  onSubmit(): void {
    this.submmited = true;
    if (this.form.valid) {
      console.log(this.palavrasChave)
      //this.form.controls['palavras_chave'].patchValue(this.palavras)
      this._recursoService.updateRecurso(this.recursoId, this.form.value).subscribe(
        (success) => {
          this._location.back();
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

/*
  get palavrasChave() : FormArray {
    return this.form.get("palavras_chave") as FormArray
  }

  newPalavrasChave(): FormGroup {
    return this.formBuilder.group({
      palavras_chave: '',
    })
 }
 
 addPalavrasChave() {
  this.palavrasChave.push(this.newPalavrasChave());
}
*/
  addPalavras(palavra: string){
    console.log(palavra);
    this.palavrasChave.push(palavra);
    console.log(this.palavrasChave);
    this.inputPalavras.nativeElement.value = '';
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

  retrievePalavrasChave(): void {
    this._recursoService.retrievePalavrasChave(this.recursoId).subscribe({
      next: (palavraChave: any) => {
        this.palavrasChave = palavraChave;
        console.log(palavraChave);
      },
      error: (err) => {
        alert('Error: ' + err);
      },
    });
  }

  handleDataCriacao(data_criacao: string) {
    this.criacao = parseInt(data_criacao.replace("-", ""));
    
    if(this.criacao > this.registro){
      this.dataValid = false;
    }else{
      this.dataValid = true;
    }
  }
  handleDataRegistro(data_registro: string) {
    this.registro = parseInt(data_registro.replace("-", ""));
    if(this.criacao > this.registro){
      this.dataValid = false;
    }
  }
}
