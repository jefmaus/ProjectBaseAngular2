import { MatButtonModule, MatCheckboxModule, MatInputModule, MatToolbarModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';

// MatFormFieldModule: para que acepte la etiqueta de error mat-error

@NgModule({
  imports: [MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule],
  exports: [MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule],
})
export class MaterialModules { }