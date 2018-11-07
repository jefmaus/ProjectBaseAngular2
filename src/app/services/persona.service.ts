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
    return this.http.get('http://localhost:58520/api/persona');
  }

  guardarPersona(persona: Persona) {
    console.log(persona);
    return this.http.post('http://localhost:58520/api/persona', persona);
  }

  modificarPersona(persona: Persona) {
       return this.http.put('http://localhost:58520/api/persona/'+persona.id_persona, persona);
  }

  eliminarPersona(id: number) {
       return this.http.delete('http://localhost:58520/api/persona/'+id);
  }  

  isLogin() {
    return this.cookie.get("isLogin");
  }

  validarLogin(persona: Persona) {
    if(persona.usuario == 'jefmaus' && persona.clave == 'Casa.123') {
      this.persona = new Persona();
      this.persona.documento = 123;
      this.persona.nombre = 'Jefrey';
      this.persona.apellido = 'Carvajalino';
      this.persona.direccion = 'Calle 13';
      this.persona.email = 'jefmaus@hotmail.com';
      this.persona.fecha_registro = new Date(Date.now());
      this.persona.usuario = 'jefmaus';
      this.persona.clave = '123';
      this.persona.estado = '1';
      return this.persona;
    } else {
      this.persona = new Persona();
      return this.persona;
    }

  }

  /*validarLogin(usuario: string, clave: string) {
    if(usuario == 'jefmaus' && clave == '123') {
      this.persona = new Persona();
      this.persona.documento = 123;
      this.persona.nombre = 'Jefrey';
      this.persona.apellido = 'Carvajalino';
      this.persona.direccion = 'Calle 13';
      this.persona.email = 'jefmaus@hotmail.com';
      this.persona.fechaRegistro = new Date(Date.now());;
      this.persona.usuario = 'jefmaus';
      this.persona.clave = '123';
      this.persona.estado = '1';
      return this.persona;
    } else {
      return this.persona;
    }*/

}
