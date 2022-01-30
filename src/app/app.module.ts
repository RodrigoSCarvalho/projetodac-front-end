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
import { CursoAddComponent } from './curso/curso-add/curso-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CursoViewComponent } from './curso/curso-view/curso-view.component';
import { EventoViewComponent } from './evento/evento-view/evento-view.component';
import { FormsModule } from '@angular/forms';
import { RecursoViewComponent } from './recurso/recurso-view/recurso-view.component';
import { RecursoEditComponent } from './recurso/recurso-edit/recurso-edit.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { NgSelect2Module } from 'ng-select2';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

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
    EventoAddComponent,
    CursoAddComponent,
    CursoViewComponent,
    EventoViewComponent,
    RecursoViewComponent,
    RecursoEditComponent,
        
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(maskConfig),
    NotifierModule,
    NgSelect2Module
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [CursoComponent],
})
export class AppModule { }
