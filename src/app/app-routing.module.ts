import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CursoComponent } from './curso/curso.component';
import { EventoComponent } from './evento/evento.component';
import { HomeComponent } from './home/home.component';
import { RecursoComponent } from './recurso/recurso.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recursos', component: RecursoComponent},
  { path: 'eventos', component: EventoComponent},
  { path: 'cursos', component: CursoComponent},
];

export const routing = RouterModule.forRoot(routes);

export const AppRoutes = RouterModule.forChild(routes);
