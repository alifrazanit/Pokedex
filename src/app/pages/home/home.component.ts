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
import { catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { CommonApiService } from '@services/commonApi/common-api.service';
import { UtilsService } from '@utils/utils.service';


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
  maxPokemon: number = 0;

  constructor(
    private pokemonTypeService: PokemonTypeService,
    private pokemonService: PokemonService,
    private commonApi: CommonApiService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.getPokemonType();
    this.getPokemon();
  }


  getPokemonType() {
    this.pokemonTypeService.getPokemonType().subscribe(res => {
      this.DDLData = res;
    })
  }

  getPokemon() {
    this.pokemonService.getPokemon().subscribe(res => {
      const rows = res.rows;
      const countData = res.countData;
      this.maxPokemon = countData;

      this.ListPokemon = rows;
    });
  }

  onChooseFilter(event: any) {
    const pokemonType = event.pokemonType;
    this.pokemonTypeService.getPokemonTypeByName(pokemonType).pipe(
      switchMap(response => {
        const res: any = response;
        const pokemon = res.pokemon;

        const obsPokemon = pokemon.map((pok: any) => this.commonApi.get(pok.pokemon.url).pipe(
          catchError(err => {
            return of([]);
          })
        ));
        return forkJoin(obsPokemon);
      }),
      map(res => {
        const listOfPokemon: any = res;
        const dataReady: Pokemon[] = [];
        for (let i = 0; i < listOfPokemon.length; i++) {
          const image = listOfPokemon[i].sprites['other']['dream_world']['front_default'];
          const imageDefault = listOfPokemon[i].sprites['front_default'];
          dataReady.push({
            id: this.utilsService.paddStartId(this.maxPokemon, listOfPokemon[i].id),
            name: `${String(listOfPokemon[i].name).charAt(0).toUpperCase()}${String(listOfPokemon[i].name).slice(1).toLowerCase()}`,
            height: listOfPokemon[i].height,
            weight: listOfPokemon[i].weight,
            image: image ? image : imageDefault,
            abilities: listOfPokemon[i].abilities,
            forms: listOfPokemon[i].forms,
            stats: listOfPokemon[i].stats,
            types: listOfPokemon[i].types
          })
        }
        return dataReady
      })
    ).subscribe(results => {
      this.ListPokemon = results;
    })

  }

  onDetail(event: any) {

  }

  onFavorite(event: any) {

  }
}
