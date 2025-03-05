import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('stacked-menu-active', [
      state('closed', style({ 
        position: 'relative', 
      })),
      state('open', style({ 
        position: 'fixed', 
        top: 0
      })),
      transition('closed => open', [
        animate('200ms ease-in', style({ transform: 'translateY(0)', top: 0 }))
      ]),
      transition('open => closed', [
        animate('200ms ease-out', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class HeaderComponent {
  protected menuStack: 'open' | 'closed' = 'closed';

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.menuStack = scrollTop > 70 ? 'open' : 'closed';
    console.log('scrollTop', scrollTop)
    console.log('menuStack', this.menuStack)
  }
}
