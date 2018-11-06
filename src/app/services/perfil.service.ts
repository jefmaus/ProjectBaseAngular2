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
    /* var body = JSON.stringify(perfil);
     var headerOptions = new Headers({ 'Content-Type': 'application/json' });
     var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
     //return this.http.post('http://localhost:49646/api/Perfil', body, requestOptions).subscribe(x => x.json());
     return this.http.post('http://localhost:49646/api/Perfil', body, requestOptions).subscribe(data => {
       console.log(data['_body']);
     }, error => {
       console.log(error);
     });*/

    /*var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );*/

    /*var httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });*/
    //return this.http.post('http://localhost:49646/api/Perfil', body, requestOptions).subscribe(x => x.json());
    console.log(perfil);
    return this.http.post('http://localhost:58520/api/perfil', perfil);
  }

  modificarPerfil(perfil: Perfil) {
    console.log(perfil);
       return this.http.put('http://localhost:58520/api/perfil/'+perfil.id_perfil, perfil);
  }

  getPerfiles() {
    //return this.http.get<Perfil[]>('http://localhost:49646/api/Perfil');
    return this.http.get('http://localhost:58520/api/perfil');
    //return this.listaPerfiles;
  }

}
