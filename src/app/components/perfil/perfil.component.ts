import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil';
import { PerfilService } from 'src/app/services/perfil.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfil: Perfil;

  constructor(private perfilService: PerfilService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    perfil: new FormControl('', [Validators.required])
  });

  initializeFormGroup() {
    this.form.setValue({
      perfil: '',
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.perfil = new Perfil();
      try {
        this.perfilService.guardarPerfil(this.form.value);
      } catch (error) {
        this.toastr.warning("Ha ocurrido un error al intentar guardar el perfil");
      } 
    }
  }

}
