import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';
import { CookieService } from 'ngx-cookie-service';
import { Perfil } from '../models/perfil';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  persona: Persona;
  perfil: Perfil;
  listaPerfiles: Array<Perfil>;
  token: string;
  headers = new HttpHeaders();


  constructor(private cookie: CookieService, private http: HttpClient) {

  }

  getPersonas() {
    this.token = this.cookie.get("tkn");
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.get('http://localhost:60474/api/persona', { headers: this.headers });
  }

  guardarPersona(persona: Persona) {
    this.token = this.cookie.get("tkn");
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.post('http://localhost:60474/api/persona', persona, { headers: this.headers });
  }

  modificarPersona(persona: Persona) {
    this.token = this.cookie.get("tkn");
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.put('http://localhost:60474/api/persona/' + persona.id_persona, persona, { headers: this.headers });
  }

  eliminarPersona(id: number) {
    this.token = this.cookie.get("tkn");
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.delete('http://localhost:60474/api/persona/' + id, { headers: this.headers });
  }

  isLogin() {
    return this.cookie.get("isLogin");
  }

  login(persona: Persona) {
    let headers = new HttpHeaders();
    return this.http.post('http://localhost:60474/api/login', persona);
  }

  validarLogin() {
    this.token = this.cookie.get("tkn");
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.token);
    //headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get('http://localhost:60474/api/login/validarLogin', { headers: this.headers });
  }


}
