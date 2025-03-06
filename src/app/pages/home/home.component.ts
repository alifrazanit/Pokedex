import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BannerComponent } from '@components/banner/banner.component';
import { CardComponent } from '@components/card/card.component';
import { FieldSearchComponent } from '@components/field-search/field-search.component';
import { HeaderComponent } from '@components/header/header.component';
import { PokemonTypeService } from '@services/pokemonType/pokemon-type.service';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    HeaderComponent,
    BannerComponent,
    FieldSearchComponent,
    CardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent implements OnInit {

  constructor(
    private pokemonTypeService:PokemonTypeService
  ){}

  ngOnInit(): void {
    this.getPokemonType();
  }


  getPokemonType(){
    this.pokemonTypeService.getPokemonType().subscribe(res => {
      const count = res.count;
      const next = res.next;
      const previous = res.previous;
      const results = res.results;

      console.log('results', results)

    })
  }
}
