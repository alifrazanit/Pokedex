import { Routes } from '@angular/router';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { TemplateComponent } from '@template/template.component';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./template/template.component').then(c => c.TemplateComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
            },
            {
                path: 'pokemon',
                loadComponent: () => import('./pages/pokemon/pokemon-detail/pokemon-detail.component').then(c => c.PokemonDetailComponent)
            }
        ]
    },
    { path: '**', component: NotFoundComponent }
];
