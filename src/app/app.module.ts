import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing, appRoutingProviders} from './app.routing'; // para que funcione el archivo de rutas
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
// ngCookie
import { CookieService } from 'ngx-cookie-service';
// Guard
import { LoginGuard} from './guards/login.guard';
import { NologinGuard} from './guards/nologin.guard';

// Importamos el archivo donde declaramos todos los modulos de material
import { MaterialModules } from './material.components';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { PersonaService } from './services/persona.service';
import { PerfilService } from './services/perfil.service';
import { PrincipalComponent } from './components/principal/principal.component';
import { PersonaDataTableComponent } from './components/persona/persona-data-table/persona-data-table.component';
import { FormPersonaComponent } from './components/persona/form-persona/form-persona.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilDataTableComponent } from './components/perfil/perfil-data-table/perfil-data-table.component';
import { FormPerfilComponent } from './components/perfil/form-perfil/form-perfil.component';
import { PersonaComponent } from './components/persona/persona.component';

//import {ErrorStateMatcher} from '@angular/material/core'; // ***** QUITARLO SINO FUNCIONA VALIDACION

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    PrincipalComponent,
    PersonaDataTableComponent,
    FormPersonaComponent,
    PersonaComponent,
    PerfilComponent,
    PerfilDataTableComponent,
    FormPerfilComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    routing,
    ToastrModule.forRoot(),
    HttpModule,
    HttpClientModule
  ],
  entryComponents: [
    // Agregar aqui los componentes que van a ser cargados en una modal.
    FormPersonaComponent,
    FormPerfilComponent
  ],
  providers: [
    PersonaService,
    PerfilService,
    appRoutingProviders,
    CookieService,
    LoginGuard,
    NologinGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
