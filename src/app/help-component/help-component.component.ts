import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-help-component',
  standalone: true,
  imports: [RouterModule,MatIconModule],
  templateUrl: './help-component.component.html',
  styleUrl: './help-component.component.css'
})
export class HelpComponentComponent {

}
