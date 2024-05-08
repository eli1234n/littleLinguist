
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    RouterModule,
    CommonModule ,MatIconModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent { 

  constructor(@Inject(MAT_DIALOG_DATA) public data:boolean) { }

  d:boolean = true
}
