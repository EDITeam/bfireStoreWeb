import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeNavigationComponent } from './homepage/home-navigation/home-navigation.component';
import { HomeContentComponent } from './homepage/home-content/home-content.component';

const routes: Routes = [{
  /* 路由入口 */
  path: '',
  redirectTo: '/HomePageNavigationComponent',
  pathMatch: 'full'
},
{
  path: 'HomePageNavigationComponent',
  component: HomeNavigationComponent
},
{
  path: 'HomePage',
  component: HomeContentComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
