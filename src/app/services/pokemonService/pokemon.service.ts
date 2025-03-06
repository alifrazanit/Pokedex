import { Injectable } from '@angular/core';
import { CommonApiService } from '@services/commonApi/common-api.service';
import { environment } from '@env/environment';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from 'src/app/interfaces/PokemonInterface';
import { UtilsService } from '@utils/utils.service';
import { DDLPokemonType } from '@interfaces/DDLPokemonType';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private BASEURL: string = environment.pokemonApi;
  private URL: string = 'pokemon?limit=2&offset=0';
  constructor(
    private commonApi: CommonApiService,
    private utilsService: UtilsService
  ) { }

  getPokemon() {
    return this.commonApi.get(`${this.BASEURL}${this.URL}`).pipe(
      switchMap(res => {
        const countData = res.count;
        if (res.results.length === 0) {
          return of([])
        }
        const listPokemon: any[] = res.results;
        const obsDatas = listPokemon.map(pokemon => this.commonApi.get(pokemon.url).pipe(
          catchError(err => {
            return of([]);
          })
        ));
        return forkJoin(obsDatas).pipe(
          map(pokemonDetails => ({ countData, pokemonDetails }))
        )
      }),
      switchMap(res => {
        const results: any = res;
        const pokemonDetails = results.pokemonDetails;
        const countData = results.countData;

        if (pokemonDetails.length === 0) {
          return of([])
        }

        const listOfPokemon: any = pokemonDetails;
        const DataTypes = listOfPokemon.flatMap((lop: any) => lop.types);
        const ObsDataTypes = DataTypes.map((dt: { slot: any, type: any; }) => this.commonApi.get(dt.type.url).pipe(
          catchError(err => {
            return of([]);
          })
        ));
        return forkJoin(ObsDataTypes).pipe(
          map(pokemonTypeDetail => ({ countData, pokemonDetails, pokemonTypeDetail}))
        )
      }),
      map(res => {
        const results: any = res;
        const pokemonDetails = results.pokemonDetails;
        const countData = results.countData;
        const pokemonTypeDetail = results.pokemonTypeDetail;
        const filterTypes = pokemonTypeDetail.map((ptd: any) => ({
          name: ptd.name,
          id: ptd.id,
          sprites: ptd.sprites
        }))
        console.log('filterTypes', filterTypes)
        const listOfPokemon: any = pokemonDetails;
        const dataReady: Pokemon[] = [];

        for (let i = 0; i < listOfPokemon.length; i++) {
          const image = listOfPokemon[i].sprites['other']['dream_world']['front_default'];
        
          dataReady.push({
            id: this.utilsService.paddStartId(countData, listOfPokemon[i].id),
            name: `${String(listOfPokemon[i].name).charAt(0).toUpperCase()}${String(listOfPokemon[i].name).slice(1).toLowerCase()}`,
            height: listOfPokemon[i].height,
            weight: listOfPokemon[i].weight,
            image: image ? image : '/pokeball-color.svg',
            abilities: listOfPokemon[i].abilities,
            forms: listOfPokemon[i].forms,
            stats: listOfPokemon[i].stats,
            types: filterTypes
          })
        }

        console.log('dataReady', dataReady)
        return dataReady;
      })
    )
  }

}
