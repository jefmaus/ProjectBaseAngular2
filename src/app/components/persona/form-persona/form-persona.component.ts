import { Component, OnInit, Inject } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Perfil } from 'src/app/models/perfil';
import { PerfilService } from 'src/app/services/perfil.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    private toastr: ToastrService,
    private perfilService: PerfilService,
    public dialogRef: MatDialogRef<FormPersonaComponent>, @Inject(MAT_DIALOG_DATA) public data: { persona: any }) {
    this.persona = this.data.persona;
  }

  ngOnInit() {
    this.perfilService.getPerfiles().toPromise().then((res: Perfil[]) => {
      this.listaPerfiles = res;
    })

    if (this.persona != null && this.persona.id_persona != null) {
      this.fillForm();
    }
  }

  fillForm() {
    this.form.setValue({
      id_persona: this.persona.id_persona,
      id_perfil: this.persona.id_perfil,
      documento: this.persona.documento,
      nombre: this.persona.nombre,
      apellido: this.persona.apellido,
      direccion: this.persona.direccion,
      telefono: this.persona.telefono,
      email: this.persona.email,
      fechaRegistro: this.persona.fechaRegistro,
      usuario: this.persona.usuario,
      clave: this.persona.clave,
      estado: this.persona.estado,      
    })
  }


  form: FormGroup = new FormGroup({
    id_persona: new FormControl(null),
    id_perfil: new FormControl(null, Validators.required),
    documento: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\\sáéíóúÁÉÍÓÚñÑ]+$')]),
    apellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\\sáéíóúÁÉÍÓÚñÑ]+$')]),
    direccion: new FormControl('', Validators.pattern('^[a-zA-Z0-9\\s\\-\\#\\,áéíóúÁÉÍÓÚñÑ]+$')),
    telefono: new FormControl('', Validators.pattern('^[0-9]+$')),
    email: new FormControl('', Validators.email), //\S+@\S+\.\S+
    fechaRegistro: new FormControl(null),
    usuario: new FormControl('', [Validators.required, Validators.minLength(6)]),
    clave: new FormControl('', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[0-9])(?=.*[$@$!%*?&\\.\\-\\_])[A-Za-z0-9\d$@$!%*?&\\.\\-\\_].{7,}$")]),
    estado: new FormControl('1')
  });

  initializeFormGroup() {
    this.form.setValue({
      id_persona: null,
      id_perfil: null,
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
    })
  }

  onSubmit() {
    if (this.form.valid) {
      try {
        this.personaService.guardarPersona(this.form.value).subscribe(res => {
          this.toastr.info("La persona ha sido creada correctamente");
          this.dialogRef.close();
        },
          err => {
            console.log(err);
          }
        );
        this.onReset();
      } catch (error) {
        this.toastr.error("Error al intentar crear la persona");
      }

    }
  }

  onReset() {
    this.form.reset();
    this.initializeFormGroup();
  }

}
