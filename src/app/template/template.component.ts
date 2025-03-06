import { Component, effect, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { LoadingSpinnerComponent } from '@components/loading-spinner/loading-spinner.component';
// import { LoadingServiceService } from '@services/loadingService/loading-service.service';

@Component({
  selector: 'app-template',
  imports: [
    RouterOutlet,
    // LoadingSpinnerComponent
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
  standalone: true
})
export class TemplateComponent implements OnInit{
  constructor(
    // private loadingService: LoadingServiceService
  ) {  }

  ngOnInit(): void { }

}
