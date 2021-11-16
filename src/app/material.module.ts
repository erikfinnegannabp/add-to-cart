import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTableModule } from '@angular/material/table'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDividerModule } from '@angular/material/divider'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule, MatTableModule,
    MatExpansionModule, MatDividerModule, MatInputModule, ReactiveFormsModule, MatSlideToggleModule,
    MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule
    ],
  exports: [MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule, MatTableModule,
    MatExpansionModule, MatDividerModule, MatInputModule, ReactiveFormsModule, MatSlideToggleModule,
    MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule
    ]
})

export class MaterialModule {}
