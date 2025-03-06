import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BannerComponent } from '@components/banner/banner.component';
import { CardComponent } from '@components/card/card.component';
import { FieldSearchComponent } from '@components/field-search/field-search.component';
import { HeaderComponent } from '@components/header/header.component';
import { PokemonService } from '@services/pokemonService/pokemon.service';
import { PokemonTypeService } from '@services/pokemonType/pokemon-type.service';
import { DDLPokemonType } from '@interfaces/DDLPokemonType';
import { Pokemon } from '@interfaces/PokemonInterface';


@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    HeaderComponent,
    BannerComponent,
    FieldSearchComponent,
    CardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent implements OnInit {
  DDLData: DDLPokemonType[] = [];
  ListPokemon: Pokemon[] = [];
  constructor(
    private pokemonTypeService:PokemonTypeService,
    private pokemonService: PokemonService
  ){}

  ngOnInit(): void {
    this.getPokemonType();
    this.getPokemon();
  }


  getPokemonType(){
    this.pokemonTypeService.getPokemonType().subscribe(res => {
      this.DDLData = res;
    })
  }

  getPokemon(){
    this.pokemonService.getPokemon().subscribe(res => {
      this.ListPokemon = res;
      console.log('this.ListPokemon', this.ListPokemon);
    });
  }

  onChooseFilter(event: any){
    console.log('onChooseFilter', event)
  }

  onDetail(event: any){

  }

  onFavorite(event: any){
    
  }
}
