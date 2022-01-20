import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CursoComponent } from './curso/curso.component';
import { EventoAddComponent } from './evento/evento-add/evento-add.component';
import { EventoComponent } from './evento/evento.component';
import { HomeComponent } from './home/home.component';
import { RecursoAddComponent } from './recurso/recurso-add/recurso-add.component';
import { RecursoComponent } from './recurso/recurso.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'recursos', children: [
      { path: 'add', component: RecursoAddComponent },
      { path: '', component: RecursoComponent },]
  },
  {
    path: 'eventos', children: [{ path: '', component: EventoComponent },
    { path: 'add', component: EventoAddComponent },]
  },
  { path: 'cursos', component: CursoComponent },
]

export const routing = RouterModule.forRoot(routes);

export const AppRoutes = RouterModule.forChild(routes);
