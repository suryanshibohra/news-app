import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponent } from './news/news.component';
import { AuthGuard } from './auth-gaurd.service'

const routes: Routes = [
    { path: '', redirectTo: '/news', pathMatch: 'full' },
    { path: 'news', component: NewsComponent, data: {animation: 'NewsComponent'} },
    { path: 'article', 
      component: NewsDetailComponent, 
      canActivate: [AuthGuard],
      data: {animation: 'NewsDetailComponent'} 
    },
    {path: '**', component: NewsDetailComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }

