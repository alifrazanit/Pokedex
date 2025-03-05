import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-template',
  imports: [RouterOutlet],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
  standalone: true
})
export class TemplateComponent {

}
