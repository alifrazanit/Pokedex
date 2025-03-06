import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { Pokemon } from '@interfaces/PokemonInterface';
import { PokemonService } from '@services/pokemonService/pokemon.service';
import { PokemonTypeService } from '@services/pokemonType/pokemon-type.service';
import { UtilsService } from '@utils/utils.service';
import { catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  imports: [
    HeaderComponent,
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
  standalone: true
})
export class PokemonDetailComponent implements OnInit {
  pokemonNameOrId: any = '';
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
  maxPokemon: number = 0;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private pokemonTypeService: PokemonTypeService,
    private utilsService: UtilsService
  ) {
    this.route.paramMap.subscribe(params => {
      this.pokemonNameOrId = params.get('name');
      this.getCount();
      this.getDetail();
    })
  }

  ngOnInit(): void { }

  getCount() {
    this.pokemonService.getPokemon().subscribe(res => {
      this.maxPokemon = res.countData;
    })
  }
  getDetail() {
    this.pokemonService.getPokemonByName(this.pokemonNameOrId).pipe(
      switchMap(response => {
        if (!response) {
          return of(null);
        }
        const result: any = response;
        const dataTypes = result.types;
        const obsDataType = dataTypes.map((dt: any) => this.pokemonTypeService.getPokemonTypeByName(dt.type.name).pipe(
          catchError(err => {
            return of([]);
          })
        ));
        return forkJoin(obsDataType).pipe(
          map(pokemonTypeDetails => ({ pokemonDetail: response, pokemonTypeDetails: pokemonTypeDetails }))
        )
      }),
      tap(resultFalk => {
        console.log('RESS', resultFalk)
        const results: any = resultFalk;
        const pokemonDetail = results.pokemonDetail;
        const pokemonTypeDetails = results.pokemonTypeDetails;
        if (pokemonDetail && pokemonTypeDetails) {
          let pokemonType: any[] = []

          const image = pokemonDetail.sprites['other']['dream_world']['front_default'];
          const imageDefault = pokemonDetail.sprites['front_default'];
          this.pokemon = {
            id: this.utilsService.paddStartId(this.maxPokemon, pokemonDetail.id),
            name: `${String(pokemonDetail.name).charAt(0).toUpperCase()}${String(pokemonDetail.name).slice(1).toLowerCase()}`,
            height: pokemonDetail.height,
            weight: pokemonDetail.weight,
            image: image ? image : imageDefault,
            abilities: pokemonDetail.abilities,
            forms: pokemonDetail.forms,
            stats: pokemonDetail.stats,
            types: null
          }

          if (pokemonTypeDetails.length != 0) {
            for (let i = 0; i < pokemonTypeDetails.length; i++) {
              pokemonType.push({
                id: Math.random(),
                sprites: pokemonTypeDetails[i].sprites
              })
            }
          }

          this.pokemon = {
            ...this.pokemon,
            types: pokemonType
          }
          console.log('this.pokemon', this.pokemon)
        }
      })
    ).subscribe()
  }


}
