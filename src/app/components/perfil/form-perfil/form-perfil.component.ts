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
  nombre: string = '';

  constructor(private perfilService: PerfilService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FormPerfilComponent>, @Inject(MAT_DIALOG_DATA) public data: { perfil: Perfil }) {
    //console.log(this.data.perfil); // data que puedo recibir desde el componente que abre la modal
    this.perfil = this.data.perfil;
  }

  ngOnInit() {
          //Perfil: {{perfil.nombre}}
          
          
          console.log(this.perfil.nombre);
  }

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required])
  });

  initializeFormGroup() {
    this.form.setValue({
      nombre: ''
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.perfil = new Perfil();
      try {
        this.perfilService.guardarPerfil(this.form.value).subscribe(res => {
          this.closeModal();
          //this.router.navigate(["/personas.html"]);
          this.toastr.success("El perfil ha sido creado correctamente.");
          /*let perf: Perfil = res.body;
          console.log(perf.perfil);
          console.log(res.headers.get('Content-Type'));*/
        },
          err => {
            console.log(err);
          }
        );
        this.onReset();
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
    //this.initializeFormGroup();
  }

}
