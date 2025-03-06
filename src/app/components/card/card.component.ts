import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Pokemon } from '@interfaces/PokemonInterface';
@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnChanges {
  @Input() data: any = [];
  @Output() onClick = new EventEmitter();
  @Output() onFavorite = new EventEmitter();

  pokemon: Pokemon = {
    abilities: null,
    forms: null,
    height: 0,
    id: 0,
    image: '',
    name: '',
    stats: null,
    types: null,
    weight: 0
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      const pokemonData = changes['data'].currentValue;
      if (pokemonData) {
        this.pokemon = pokemonData;
        console.log('this.pokemon', this.pokemon)
      }
    }
  }

}
