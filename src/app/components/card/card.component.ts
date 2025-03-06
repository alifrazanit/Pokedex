import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Pokemon } from '@interfaces/PokemonInterface';
import { PokemonTypeService } from '@services/pokemonType/pokemon-type.service';
import { CommonApiService } from '@services/commonApi/common-api.service';

import { catchError, forkJoin, of, switchMap } from 'rxjs';
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

  constructor(
    private PokemonType: PokemonTypeService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      const pokemonData = changes['data'].currentValue;
      if (pokemonData) {
        this.getPokemonType(pokemonData);
      }
    }
  }

  getPokemonType(data: any) {
    const dataTypes = data.types;
    let sprites: any[]= []; 
    const obsDataType = dataTypes.map((dt: any) => this.PokemonType.getPokemonTypeByName(dt.type.name).pipe(
      catchError(err => {
        return of([]);
      })
    ));
    forkJoin(obsDataType).subscribe(res =>{
      const tmp: any = res;
      const pokemonTypes = tmp;

      if(pokemonTypes.length != 0){
        for(let i = 0; i < pokemonTypes.length; i++){
          sprites.push({
            id: Math.random(),
            sprites: pokemonTypes[i].sprites
          })
        }
      }
      this.pokemon = {
        ...data,
        types: sprites
      }
    })
  }

}
