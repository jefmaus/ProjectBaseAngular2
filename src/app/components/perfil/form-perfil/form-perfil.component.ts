import { Component, OnInit, Inject } from '@angular/core';
import { Perfil } from 'src/app/models/perfil';
import { PerfilService } from 'src/app/services/perfil.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-form-perfil',
  templateUrl: './form-perfil.component.html',
  styleUrls: ['./form-perfil.component.css']
})
export class FormPerfilComponent implements OnInit {

  public perfil: Perfil;

  constructor(private perfilService: PerfilService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FormPerfilComponent>, @Inject(MAT_DIALOG_DATA) public data: { perfil: any }) {
    //console.log(this.data.perfil); // data que puedo recibir desde el componente que abre la modal
    this.perfil = this.data.perfil;
  }

  ngOnInit() {
    if (this.perfil != null && this.perfil.id_perfil != null) {
      this.fillForm();
    }
  }

  form: FormGroup = new FormGroup({
    id_perfil: new FormControl(),
    nombre: new FormControl('', [Validators.required])
  });

  fillForm() {
    this.form.setValue({
      id_perfil: this.perfil.id_perfil,
      nombre: this.perfil.nombre
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.perfil = new Perfil();
      try {
        if (this.form.value.id_perfil != null && this.form.value.id_perfil != '') {
          this.perfilService.modificarPerfil(this.form.value).subscribe(res => {
            this.closeModal();
            this.toastr.info("El perfil ha sido modificado correctamente.");
          },
            err => {
              console.log(err);
            }
          );
          this.onReset();
        } else {
          this.perfilService.guardarPerfil(this.form.value).subscribe(res => {
            this.closeModal();
            this.toastr.info("El perfil ha sido creado correctamente.");
          },
            err => {
              console.log(err);
            }
          );
          this.onReset();
        }
      } catch (error) {
        this.toastr.warning("Ha ocurrido un error al intentar guardar el perfil");
      }
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onReset() {
    this.form.reset();
  }

}
