import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Perfil } from 'src/app/models/perfil';
import { FormPerfilComponent } from '../form-perfil/form-perfil.component';
import { PerfilService } from 'src/app/services/perfil.service';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-perfil-data-table',
  templateUrl: './perfil-data-table.component.html',
  styleUrls: ['./perfil-data-table.component.css']
})
export class PerfilDataTableComponent implements OnInit {
  //listaPerfiles:Array<Perfil>;
  public listaPerfiles: Perfil[];


  listData: MatTableDataSource<any>;
  // El orden de "displayedColumns" es el orden que se muestra en la vista
  displayedColumns: string[] = ['nombre', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(public dialog: MatDialog, private perfilService: PerfilService, private confirmService: ConfirmService) {
    /*this.perfilService.getPerfiles().subscribe(value => {
      this.listaPerfiles = value;
      console.log(this.listaPerfiles);
   }); */
  }

  ngOnInit() {
    this.getListaPerfiles();
  }

  getListaPerfiles() {
    this.perfilService.getPerfiles().toPromise().then((res: Perfil[]) => {
      this.listaPerfiles = res;
      this.listData = new MatTableDataSource(this.listaPerfiles);
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

  openDialog(perfil?: Perfil): void {
    //console.log(perfil);
    const dialogRef = this.dialog.open(FormPerfilComponent, {
      data: { perfil: perfil }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getListaPerfiles(); // actualizo la data table
    });
  }

  borrarPerfil(id: number) {
    this.confirmService.openConfirmDialog("Está seguro que desea eliminar este perfil?")
      .afterClosed().subscribe(res => {
        if (res) {
          this.perfilService.eliminarPerfil(id).subscribe(res => {
            this.getListaPerfiles(); // actualizo la data table
          })
        }
      })

  }

}
