import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemon/:name',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { name: 'pikachu' },
        { name: 'charizard' },
        { name: 'bulbasaur' }
      ]; // Daftar Pokémon yang akan diprerender
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
