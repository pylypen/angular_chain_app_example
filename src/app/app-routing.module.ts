import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from "./error/page-not-found/page-not-found.component";


const appRoutes: Routes = [
  {path: '', loadChildren: './public/public.module#PublicModule'},
  {path: 'profile', loadChildren: "./profile/profile.module#ProfileModule"},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
