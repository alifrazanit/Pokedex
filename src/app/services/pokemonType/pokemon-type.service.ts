import { Injectable } from '@angular/core';
import { CommonApiService } from '@services/commonApi/common-api.service';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { environment } from '@env/environment';
import { DDLPokemonType } from 'src/app/interfaces/DDLPokemonType';

@Injectable({
  providedIn: 'root'
})
export class PokemonTypeService {
  private BASEURL: string = environment.pokemonApi;
  private URL: string = 'type';

  constructor(
    private commonApi: CommonApiService
  ) { }

  getPokemonType() {
    return this.commonApi.get(`${this.BASEURL}${this.URL}`).pipe(
      switchMap(response => {
        const results = response.results;
        if (results.length === 0) {
          return of([]);
        }
        const newRequests = results.map((data: { url: string; }) => this.commonApi.get(data.url).pipe(
          catchError(error => {
            return of(null);
          })
        ));
        return forkJoin(newRequests);
      }),
      map(res => {
        const pokemonTypeWithDetail: any = res;
        const dataReady: DDLPokemonType[] = [];
        for (let i = 0; i < pokemonTypeWithDetail.length; i++) {
          dataReady.push({
            id: pokemonTypeWithDetail[i].id,
            icon: pokemonTypeWithDetail[i].sprites['generation-viii']['brilliant-diamond-and-shining-pearl']['name_icon'] ? pokemonTypeWithDetail[i].sprites['generation-viii']['brilliant-diamond-and-shining-pearl']['name_icon'] : '/list-type/Normal-sm.svg',
            label: `${String(pokemonTypeWithDetail[i].name).charAt(0).toUpperCase()}${String(pokemonTypeWithDetail[i].name).slice(1).toLowerCase()}`,
            value: pokemonTypeWithDetail[i].name
          })
        }
        return dataReady;
      })
    );
  }
}
