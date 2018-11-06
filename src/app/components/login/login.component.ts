import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

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
      this.persona = this.personaService.validarLogin(this.form.value);
      if (this.persona.documento != null) {
        //alert("Bienvenido: " + this.persona.nombre);
        this.cookie.set("isLogin", "true");
        this.router.navigate(['/index.html']);
      } else {
        this.toastr.warning("Información de acceso incorrecta");
      }
    }
  }

  onClear() {
    this.form.reset();
    this.initializeFormGroup();
  }

}
