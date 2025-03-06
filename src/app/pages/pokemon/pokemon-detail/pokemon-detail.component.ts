import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { Pokemon } from '@interfaces/PokemonInterface';
import { AbilityService } from '@services/ability/ability.service';
import { CommonApiService } from '@services/commonApi/common-api.service';
import { PokemonService } from '@services/pokemonService/pokemon.service';
import { PokemonTypeService } from '@services/pokemonType/pokemon-type.service';
import { UtilsService } from '@utils/utils.service';
import { catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-pokemon-detail',
  imports: [
    HeaderComponent,
    MatProgressBarModule
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
    private utilsService: UtilsService,
    private abilityService: AbilityService,
    private commonApi: CommonApiService
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

        const image = result.sprites['other']['dream_world']['front_default'];
        const imageDefault = result.sprites['front_default'];

        this.pokemon = {
          id: result.id,
          name: result.name,
          height: result.height,
          weight: result.weight,
          image: image ? image : imageDefault,
          abilities: result.abilities,
          forms: result.forms,
          stats: result.stats,
          types: result.types,
        }

        return of(this.pokemon);
      }), switchMap(response => {
        const abilities = this.pokemon.abilities.map((ab: any) => ab.ability);
        const forms = this.pokemon.forms;
        const types = this.pokemon.types.map((t: any) => t.type);

        const obsDataType$ = abilities.map((dt: any) => this.commonApi.get(dt.url).pipe(
          catchError(err => {
            return of([]);
          })
        ));

        const obsForms$ = forms.map((f: any) => this.commonApi.get(f.url).pipe(
          catchError(err => {
            return of([]);
          })
        ))

       
        const obsTypes$ = types.map((t: any) => this.commonApi.get(t.url).pipe(
          catchError(err => {
            return of([]);
          })
        ))

        return forkJoin({
          abilities: forkJoin(obsDataType$), 
          forms: forkJoin(obsForms$),
          types: forkJoin(obsTypes$),
        })
      })
    ).subscribe(res => {
      const abilities = res.abilities;
      const forms = res.forms;
      const types = res.types;

      this.pokemon = {
        ...this.pokemon,
        stats: this.simplyfyStats(this.pokemon.stats),
        abilities: this.simplyfyAbilities(abilities),
        forms: this.simplyfyForm(forms),
        types: this.simplyfyTypes(types)
      }

      console.log('resresres', this.pokemon);
    })
  }

  simplyfyAbilities(abilities: any){
    const abilityLocal: any[] = [];
    for(let i = 0; i < abilities.length; i++){
      abilityLocal.push({
        id: abilities[i].id,
        name: abilities[i].name,
        label: abilities[i].names.find((name: any) => name.language.name === 'en'),
        effect_entries: abilities[i].effect_entries.find((effect: any) => effect.language.name === 'en')
      })
    }
    return abilityLocal;
  }

  simplyfyForm(forms: any){
    const formsLocal: any[] = [];
    for(let i = 0; i < forms.length; i++){
      formsLocal.push({
        id: forms[i].id,
        name: `${String(forms[i].name).charAt(0).toUpperCase()}${String(forms[i].name).slice(1)}`,
        image: forms[i].sprites['front_default'],
      })
    }
    return formsLocal;
  }

  simplyfyTypes(types: any){
    const TypesLocal: any[] = [];
    for(let i = 0; i < types.length; i++){
      TypesLocal.push({
        id: types[i].id,
        name: types[i].name,
        label: types[i].names.find((name: any) => name.language.name === 'en'),
        image: types[i].sprites['generation-v']['black-2-white-2']['name_icon'],
      })
    }
    return TypesLocal;
  }

  simplyfyStats(stats: any){
    const dataReady: any[] = [];
    const numberLoop: any[] = [];
    if(stats.length){
      stats.forEach((s: any) => {
        const count = Math.floor(Number(s.base_stat) / 10);
        dataReady.push({
          id: Math.random(),
          name: s['stat']['name'],
          label: `${String(s.stat.name).toUpperCase()}`,
          countStars: numberLoop.push(count),
          base_stat: s.base_stat
        })
      });
    }
    return dataReady;
  }
}
