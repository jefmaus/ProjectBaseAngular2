import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Perfil } from 'src/app/models/perfil';

@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html',
  styleUrls: ['./form-persona.component.css']
})
export class FormPersonaComponent implements OnInit {

  public persona: Persona;
  public listaPerfiles: Array<Perfil>;

  constructor(private personaService: PersonaService,
    private router: Router,
    private toastr: ToastrService) {

  }

  ngOnInit() {
    this.listaPerfiles = this.personaService.getListaPerfiles();
  }

 
  form: FormGroup = new FormGroup({
    //$key: new FormControl(null),
    documento: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\\sáéíóúÁÉÍÓÚñÑ]+$')]),
    apellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\\sáéíóúÁÉÍÓÚñÑ]+$')]),
    direccion: new FormControl('', Validators.pattern('^[a-zA-Z0-9\\s\\-\\#\\,áéíóúÁÉÍÓÚñÑ]+$')),
    telefono: new FormControl('', Validators.pattern('^[0-9]+$')),
    email: new FormControl('', Validators.email), //\S+@\S+\.\S+
    fechaRegistro: new FormControl(null),
    usuario: new FormControl('', [Validators.required, Validators.minLength(6)]),
    clave: new FormControl('', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[0-9])(?=.*[$@$!%*?&\\.\\-\\_])[A-Za-z0-9\d$@$!%*?&\\.\\-\\_].{7,}$")]),
    estado: new FormControl('1'),
    perfil: new FormControl("", Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      //$key: null,
      documento: null,
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      email: '',
      fechaRegistro: null,
      usuario: '',
      clave: '',
      estado: '1',
      perfil: ''
    })
  }

  onSubmit() {
    if (this.form.valid) {
      try {
        this.personaService.postPersona(this.form.value);
      } catch (error) {
        console.log("Error al crear la persona");
      }
      
    }
  }

  onReset() {
    this.form.reset();
    this.initializeFormGroup();
  }

}
