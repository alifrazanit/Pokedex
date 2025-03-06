import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CommonApiService } from '@services/commonApi/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class AbilityService {
  private BASEURL: string = environment.pokemonApi;
  private URL: string = 'ability';

   constructor(
     private commonApi: CommonApiService
   ) { }

   getAbilityByName(name: string){
    return this.commonApi.get(`${this.BASEURL}${this.URL}/${name}`);
  }
}
