import { Component } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';

@Component({
  selector: 'app-pokemon-detail',
  imports: [
    HeaderComponent
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
  standalone: true
})
export class PokemonDetailComponent {

}
