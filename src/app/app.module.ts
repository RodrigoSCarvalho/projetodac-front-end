import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { CursoComponent } from './curso/curso.component';
import { EventoComponent } from './evento/evento.component';
import { RecursoComponent } from './recurso/recurso.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { routing } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecursoAddComponent } from './recurso/recurso-add/recurso-add.component';
import { EventoAddComponent } from './evento/evento-add/evento-add.component';

@NgModule({
  declarations: [	
    AppComponent,
    CursoComponent,
    EventoComponent,
    RecursoComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    RecursoAddComponent,
    EventoAddComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [CursoComponent],
})
export class AppModule { }
