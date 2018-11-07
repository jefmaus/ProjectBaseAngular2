import { Injectable } from '@angular/core';
import { Perfil } from '../models/perfil';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  guardarPerfil(perfil: Perfil) {
    return this.http.post('http://localhost:58520/api/perfil', perfil);
  }

  modificarPerfil(perfil: Perfil) {
       return this.http.put('http://localhost:58520/api/perfil/'+perfil.id_perfil, perfil);
  }

  eliminarPerfil(id: number) {
       return this.http.delete('http://localhost:58520/api/perfil/'+id);
  }  

  getPerfiles() {
    return this.http.get('http://localhost:58520/api/perfil');
  }

}
