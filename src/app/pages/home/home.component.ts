import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BannerComponent } from '@components/banner/banner.component';
import { FieldSearchComponent } from '@components/field-search/field-search.component';
import { HeaderComponent } from '@components/header/header.component';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    HeaderComponent,
    BannerComponent,
    FieldSearchComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {
  
}
