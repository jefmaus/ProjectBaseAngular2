import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Persona } from 'src/app/models/persona';
import { FormPersonaComponent } from '../form-persona/form-persona.component';
import { PersonaService } from 'src/app/services/persona.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-persona-data-table',
  templateUrl: './persona-data-table.component.html',
  styleUrls: ['./persona-data-table.component.css']
})
export class PersonaDataTableComponent implements OnInit {

  private listaPersonas: Persona[];

  listData: MatTableDataSource<any>;
  // El orden de "displayedColumns" es el orden que se muestra en la vista
  displayedColumns: string[] = ['nombre', 'apellido', 'direccion', 'telefono', 'email', 'estado', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(public dialog: MatDialog,
    private personaService: PersonaService,
    private confirmService: ConfirmService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getListaPersonas();
  }

  getListaPersonas() {
    this.personaService.getPersonas().toPromise().then((res: Persona[]) => {
      this.listaPersonas = res;
      this.listData = new MatTableDataSource(this.listaPersonas);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.firstPageLabel = "Primera página";
      this.paginator._intl.lastPageLabel = "Última página";
      this.paginator._intl.nextPageLabel = "Siguiente página";
      this.paginator._intl.previousPageLabel = "Página anterior";
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      };
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  openDialog(persona?: Persona): void {
    const dialogRef = this.dialog.open(FormPersonaComponent, {
      data: { persona: persona }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getListaPersonas(); // actualizo la data table
    });
  }

  borrarPersona(id: number) {
    this.confirmService.openConfirmDialog("Está seguro que desea eliminar esta persona?")
      .afterClosed().subscribe(res => {
        if (res) {
          this.personaService.eliminarPersona(id).subscribe(res => {
            this.getListaPersonas(); // actualizo la data table
            this.toastr.warning("La persona ha sido eliminada correctamente.");
          })
        }
      })

  }


}
