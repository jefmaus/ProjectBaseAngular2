import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Persona } from 'src/app/models/persona';
import { FormPersonaComponent } from '../form-persona/form-persona.component';

@Component({
  selector: 'app-persona-data-table',
  templateUrl: './persona-data-table.component.html',
  styleUrls: ['./persona-data-table.component.css']
})
export class PersonaDataTableComponent implements OnInit {

  private listaPersonas: Array<Persona>;

  listData: MatTableDataSource<any>;
  // El orden de "displayedColumns" es el orden que se muestra en la vista
  displayedColumns: string[] = ['nombre', 'apellido', 'direccion', 'telefono', 'email', 'estado', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(public dialog: MatDialog) {
    this.listaPersonas = [
      new Persona(1, 13175266, 'Jefrey', 'Carvajalino', 'Calle 1', '3114454757', 'jefmaus@hotmail.com', new Date(), 'jefmaus', '123456', '1'),
      new Persona(2, 123, 'Pepito', 'Perez', 'Calle 2', '3116520132', 'pepe@gmail.com', new Date(), 'pepe', '123456', '1'),
      new Persona(3, 456, 'Diana', 'Paez', 'Calle 3', '3164529870', 'danis713@hotmail.com', new Date(), 'danis', '123456', '1'),
      new Persona(4, 4, 'a', 'a', 'a', 'a', 'a@hotmail.com', new Date(), 'a', '123456', '0'),
      new Persona(5, 5, 'b', 'b', 'b', 'b', 'b@hotmail.com', new Date(), 'b', '123456', '1'),
      new Persona(6, 6, 'c', 'c', 'c', 'c', 'c@hotmail.com', new Date(), 'c', '123456', '1'),
      new Persona(7, 7, 'd', 'd', 'd', 'd', 'd@hotmail.com', new Date(), 'd', '123456', '1'),
      new Persona(8, 8, 'e', 'e', 'e', 'e', 'e@hotmail.com', new Date(), 'e', '123456', '1'),
      new Persona(9, 9, 'f', 'f', 'f', 'f', 'f@hotmail.com', new Date(), 'f', '123456', '1'),
      new Persona(10, 10, 'g', 'g', 'g', 'g', 'g@hotmail.com', new Date(), 'g', '123456', '1'),
      new Persona(11,11, 'h', 'h', 'h', 'h', 'h@hotmail.com', new Date(), 'h', '123456', '1')
    ]

  }

  ngOnInit() {
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
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormPersonaComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  } 


}
