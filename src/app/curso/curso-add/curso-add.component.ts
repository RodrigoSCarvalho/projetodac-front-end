import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css']
})
export class CursoAddComponent implements OnInit {

  form!: FormGroup;
  submmited= false;
  constructor(private formBuilder: FormBuilder, private _cursoService: CursoService, private _location: Location) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [null, [Validators.minLength(2), Validators.maxLength(200)] ],
      descricao: [null, [Validators.minLength(2), Validators.maxLength(400)] ],
      imagem: [null, [Validators.minLength(2)] ],
      data_registro: [null, [Validators.minLength(8), Validators.maxLength(12)] ]
    });

  }

  onSubmit(): void {
    this.submmited = true;
    if(this.form.valid){
      this._cursoService.postCurso(this.form.value).subscribe(
        success => { this._location.back() },
          error => console.log(error),
      () => console.log('request OK')
      );
    }
  }
  onCancel(): void {
    this.submmited = false;
    this.form.reset();
  }
}
