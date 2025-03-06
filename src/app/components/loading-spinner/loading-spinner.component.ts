import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-loading-spinner',
  imports: [
    MatProgressSpinnerModule,
  ],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
  standalone: true
})
export class LoadingSpinnerComponent { }
