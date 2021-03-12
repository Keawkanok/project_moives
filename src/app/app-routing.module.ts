import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login

// const redirectLoggedInToChat = () => redirectLoggedInTo(['/chat']);
// const redirectLoggedInToMovies = () => redirectLoggedInTo(['/moives']);


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    // ...canActivate(redirectLoggedInToMovies),
  },
  {
    path: 'chat',
    // ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () =>
      import('./pages/chat/chat.module').then((m) => m.ChatPageModule),
  },
  {
    path: 'movies/:id',
    loadChildren: () =>
      import('./pages/movie-details/movie-details.module').then(
        (m) => m.MovieDetailsPageModule
      ),
  },
  {
    path: 'movies',
    // ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () =>
      import('./pages/movie/movie.module').then((m) => m.MoviePageModule),
  },
  {
    path: 'movie-details',
    loadChildren: () =>
      import('./pages/movie-details/movie-details.module').then(
        (m) => m.MovieDetailsPageModule
      ),
  },
  {
    path: 'profile',
    // ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'login/register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    // ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    // ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
