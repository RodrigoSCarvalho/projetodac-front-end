import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AutorAddComponent } from './autor/autor-add/autor-add.component';
import { AutorViewComponent } from './autor/autor-view/autor-view.component';
import { AutorComponent } from './autor/autor.component';
import { CursoAddComponent } from './curso/curso-add/curso-add.component';
import { CursoViewComponent } from './curso/curso-view/curso-view.component';
import { CursoComponent } from './curso/curso.component';
import { EventoAddComponent } from './evento/evento-add/evento-add.component';
import { EventoViewComponent } from './evento/evento-view/evento-view.component';
import { EventoComponent } from './evento/evento.component';
import { HomeComponent } from './home/home.component';
import { RecursoAddComponent } from './recurso/recurso-add/recurso-add.component';
import { RecursoViewComponent } from './recurso/recurso-view/recurso-view.component';
import { RecursoComponent } from './recurso/recurso.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'recursos',
    children: [
      { path: '', component: RecursoComponent },
      { path: 'add', component: RecursoAddComponent },
      { path: 'editar/:id', component: RecursoAddComponent },
      { path: 'view/:id', component: RecursoViewComponent }, 
    ],
  },
  {
    path: 'eventos',
    children: [
      { path: '', component: EventoComponent },
      { path: 'add', component: EventoAddComponent },
      { path: 'editar/:id', component: EventoAddComponent },
      { path: 'view/:id', component: EventoViewComponent },
    ],
  },
  {
    path: 'cursos',
    children: [
      { path: '', component: CursoComponent },
      { path: 'add', component: CursoAddComponent },
      { path: 'editar/:id', component: CursoAddComponent },
      { path: 'view/:id', component: CursoViewComponent }, 
    ],
  },
  {
    path: 'autores',
    children: [
      { path: '', component: AutorComponent },
      { path: 'add', component: CursoAddComponent },
      { path: 'editar/:id', component: AutorAddComponent },
      { path: 'view/:id', component: AutorViewComponent }, 
    ],
  },
];

export const routing = RouterModule.forRoot(routes);

export const AppRoutes = RouterModule.forChild(routes);
