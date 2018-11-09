import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Constante } from 'src/app/constantes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public persona: Persona;

  constructor(private personaService: PersonaService,
    private router: Router,
    private cookie: CookieService,
    private toastr: ToastrService) {

  }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(6)]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  initializeFormGroup() {
    this.form.setValue({
      usuario: '',
      clave: ''
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.persona = new Persona();
      let perfil = "";
      this.personaService.login(this.form.value).subscribe(res => {
        let token = res.toString();
        let x = token.split(".");
        this.cookie.set("user", JSON.parse(atob(x[1])).unique_name);
        this.cookie.set("rol", JSON.parse(atob(x[1])).role);
        this.cookie.set("isLogin", "true");
        this.cookie.set("tkn", token);
        Constante.refresco = false;
        this.router.navigate(['/index.html']);
      },
        err => {
          this.toastr.warning("Información de acceso incorrecta");
        }
      );
    }
  }

  onClear() {
    this.form.reset();
    this.initializeFormGroup();
  }

}
