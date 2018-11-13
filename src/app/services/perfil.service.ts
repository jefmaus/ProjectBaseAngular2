import { Injectable } from '@angular/core';
import { Perfil } from '../models/perfil';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  token: string;
  headers = new HttpHeaders();

  constructor(private http: HttpClient, private cookie: CookieService) {

  }

  guardarPerfil(perfil: Perfil) {
    this.token = this.cookie.get("tkn");
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.post('http://localhost:60474/api/perfil', perfil, { headers: this.headers });
  }

  modificarPerfil(perfil: Perfil) {
    this.token = this.cookie.get("tkn");
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.put('http://localhost:60474/api/perfil/' + perfil.id_perfil, perfil, { headers: this.headers });
  }

  eliminarPerfil(id: number) {
    this.token = this.cookie.get("tkn");
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.delete('http://localhost:60474/api/perfil/' + id, { headers: this.headers });
  }

  getPerfiles() {
    this.token = this.cookie.get("tkn");
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.get('http://localhost:60474/api/perfil', { headers: this.headers });
  }

}
