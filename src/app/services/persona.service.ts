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
  token:string;

  constructor(private cookie: CookieService, private http: HttpClient) { 
    this.token = cookie.get("tkn");
  }

  getPersonas() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.token);
    return this.http.get('http://localhost:60474/api/persona', {headers: headers});
  }

  guardarPersona(persona: Persona) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.token);
    console.log(persona);
    return this.http.post('http://localhost:60474/api/persona', persona, {headers: headers});
  }

  modificarPersona(persona: Persona) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.token);
       return this.http.put('http://localhost:60474/api/persona/'+persona.id_persona, persona, {headers: headers});
  }

  eliminarPersona(id: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.token);
       return this.http.delete('http://localhost:60474/api/persona/'+id, {headers: headers});
  }  

  isLogin() {
    return this.cookie.get("isLogin");
  }

  login(persona: Persona) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.token);
    return this.http.post('http://localhost:60474/api/login', persona, {headers: headers});
  }

  validarLogin() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.token);
    //headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get('http://localhost:60474/api/login/validarLogin', {headers: headers});
  }  

  
}
