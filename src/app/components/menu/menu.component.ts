import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Constante } from 'src/app/constantes';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public user: string
  private token: string;

  constructor(private cookie: CookieService, 
    private router: Router,
    private personaService: PersonaService) { 
    this.user = cookie.get("user");
    
  }

  ngOnInit() {
    // La unica forma que user este vacio es que se refreque el navegador o se haya cerrado la ventana
      this.personaService.validarLogin().subscribe(res=>{
        console.log("RES: "+res);
        if(!res) {
          this.logout();
        }
      },
      err => {
        this.logout();
      });
  }

  logout() {
    this.cookie.deleteAll();
    this.router.navigate(["/login.html"]);
  }

}
