import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './home/about/about.component';
import { DomainComponent } from './home/domain/domain.component';
import { HomeComponent } from './home/home.component';
import { JourneymgmtComponent } from './home/journeymgmt/journeymgmt.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    children:
      [
        {
          path: 'about',
          component: AboutComponent
        },
        {
          path: 'domains',
          component: DomainComponent
        },
        {
          path: 'domains/:domainId',
          // component: JourneymgmtComponent,
          children: [
            {
              path: 'journeymgmt',
              component: JourneymgmtComponent

            }
          ]
        }
      ]
  },
  { path: '', redirectTo: "/home/domains", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
