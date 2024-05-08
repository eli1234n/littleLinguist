import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dialog-exit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    RouterModule
  ],
  templateUrl: './dialogExit.component.html',
  styleUrl: './dialogExit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogExitComponent {

  constructor() { }
}




