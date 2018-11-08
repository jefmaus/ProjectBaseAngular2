import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';
import { CookieService } from 'ngx-cookie-service';
import { Perfil } from '../models/perfil';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  persona: Persona;
  perfil: Perfil;
  listaPerfiles: Array<Perfil>;

  constructor(private cookie: CookieService, private http: HttpClient) { }

  getPersonas() {
    return this.http.get('http://localhost:60474/api/persona');
  }

  guardarPersona(persona: Persona) {
    console.log(persona);
    return this.http.post('http://localhost:60474/api/persona', persona);
  }

  modificarPersona(persona: Persona) {
       return this.http.put('http://localhost:60474/api/persona/'+persona.id_persona, persona);
  }

  eliminarPersona(id: number) {
       return this.http.delete('http://localhost:60474/api/persona/'+id);
  }  

  isLogin() {
    return this.cookie.get("isLogin");
  }

  validarLogin(persona: Persona) {
    return this.http.post('http://localhost:60474/api/login', persona);
  }
}
