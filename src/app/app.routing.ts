import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes
import { PrincipalComponent } from './components/principal/principal.component';
import { LoginComponent } from './components/login/login.component';
import { PersonaComponent } from './components/persona/persona.component';
import { LoginGuard } from './guards/login.guard';
import { NologinGuard} from './guards/nologin.guard';
import { PerfilComponent } from './components/perfil/perfil.component';

const appRoutes: Routes = [
    {path: '', component: PrincipalComponent, canActivate: [LoginGuard]}, // Pagina que carga predeterminada (index)
    {path: 'index.html', component: PrincipalComponent, canActivate: [LoginGuard]},
    {path: 'login.html', component: LoginComponent, canActivate: [NologinGuard]},
    //{path: 'principal.html', component: PrincipalComponent, canActivate: [LoginGuard]},
    {path: 'usuarios.html', component: PersonaComponent, canActivate: [LoginGuard]},
    {path: 'perfiles.html', component: PerfilComponent, canActivate: [LoginGuard]},
    //{path: 'contacto/:param1', component: ContactoComponent},
    {path: '**', component: LoginComponent} // cuando no exista el componente que indicamos en la url, que cargue este. Es como el error 404. OJO !!! este linea debe ser la última
]

export const appRoutingProviders: any[] = []; // Este es un procedimiento que necesita angular para cargar el provider de la ruta y que todo funcione
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); // Le decimos que array de rutas debe cargar, en este caso appRoutes

// Finalmente este archivo se debe cargar en el app.module.ts para que funcione