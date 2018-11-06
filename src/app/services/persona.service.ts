import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';
import { CookieService } from 'ngx-cookie-service';
import { Perfil } from '../models/perfil';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  persona: Persona;
  perfil: Perfil;
  listaPerfiles: Array<Perfil>;

  constructor(private cookie: CookieService, private http: Http) { }

  postPersona(persona: Persona) {
    console.log(persona);
    var body = JSON.stringify(persona);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:58520/api/Persona', body, requestOptions).subscribe(x => x.json());
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
      this.persona.fechaRegistro = new Date(Date.now());
      this.persona.usuario = 'jefmaus';
      this.persona.clave = '123';
      this.persona.estado = '1';
      return this.persona;
    } else {
      this.persona = new Persona();
      return this.persona;
    }

  }

  getListaPerfiles() {
    this.listaPerfiles = [
      this.perfil = new Perfil(1, "Miembro"),
      this.perfil = new Perfil(2, "Administrador")
    ]
    return this.listaPerfiles;
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
