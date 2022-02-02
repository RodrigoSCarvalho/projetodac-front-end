import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Autor } from '../models/Autor';
import { AutorService } from '../services/autor.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {

  constructor(
    private _autorService: AutorService,
    private _router: Router,
    private route: ActivatedRoute,
    notifierService: NotifierService
  ) {this.notifier = notifierService;}

  autorNome: string | undefined;
  autorSobrenome: string | undefined;
  deleteId!: number;
  autor: Autor = new Autor();
  autores: Autor[] = [];
  private readonly notifier: NotifierService;


  ngOnInit(): void {
    this.retrieveAllAutores();
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

  deleteAutor() {
    this._autorService.deleteAutor(this.deleteId).subscribe((next) => {
      let notifica = "Autor: "+this.autorNome+" "+this.autorSobrenome+ " deletado com sucesso!";
      this.notifier.notify('error', notifica);
      this.ngOnInit();
      this.closePopup();
    });
  }

  displayStyle = 'none';

  openPopup(id: number, nome: string | undefined, sobrenome: string | undefined): void {
    this.deleteId = id;
    this.autorNome = nome;
    this.autorSobrenome = sobrenome;
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  onView(id: number): void {
    this._router.navigate(['view', id], { relativeTo: this.route });
  }
}




