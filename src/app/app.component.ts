import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ExitButtonComponent } from './exit-button/exitButton/exitButton.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent,ExitButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'little-linguist';
}
