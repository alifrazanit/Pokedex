import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '@components/header/header.component';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {

}
