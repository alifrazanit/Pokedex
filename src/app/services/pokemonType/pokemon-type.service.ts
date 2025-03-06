import { Injectable } from '@angular/core';
import { CommonApiService } from '@services/commonApi/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonTypeService {
  private URL: string = 'type';
  constructor(
    private commonApi: CommonApiService
  ) { }

  getPokemonType(){
    return this.commonApi.get(this.URL);
  }
}
