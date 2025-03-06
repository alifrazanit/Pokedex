import { Injectable } from '@angular/core';
import { CommonApiService } from '@services/commonApi/common-api.service';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private URL: string = 'pokemon';
  constructor(
    private commonApi: CommonApiService
  ) { }

  getPokemon(){
    return this.commonApi.get(this.URL);
  }
}
