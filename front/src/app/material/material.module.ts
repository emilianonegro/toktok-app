import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
  ],
})
export class MaterialModule {}
