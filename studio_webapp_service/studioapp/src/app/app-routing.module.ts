import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomainComponent } from './home/domain/domain.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DomainStudioComponent } from './home/domain-studio/domain-studio.component';
import { JourneyComponent } from './home/journey/journey.component';

import { NodeCategoriesListComponent } from './home/node-categories-list/node-categories-list.component';
import { JourneyviewComponent } from './home/journeyview/journeyview.component';
import { NodesListComponent } from './home/nodes-list/nodes-list.component';
import { StudioComponent } from './home/studio/studio.component';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { UserProfileDisplayComponent } from './home/user-profile-display/user-profile-display.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [

  {
    path:"home",
    component:HomeComponent,
    children:
    [
      {
        path: 'profile',
        component: UserProfileDisplayComponent
      },  
      {
        path: 'profile/edit',
        component: UserProfileComponent
      },  
      {
        path: 'domains',
        component: DomainComponent
      },
      {
        path: 'domains/:domainId',
        children:[
          {
            path:'',
            component : DomainStudioComponent,
            children: [
              {
                path: 'nodes',
                component: NodesListComponent
              },
              {
                path: 'nodecategories',
                component: NodeCategoriesListComponent
              },
              {
                path: 'journeyview',
                component: JourneyviewComponent
              },
              {
                 path: 'studio',
                 component: StudioComponent,
              },
            ]
          },

        ]
      }
    ],
    canActivate: [AuthGuardService]
  },
  {path:"login",component:LoginComponent},
  {path:'',redirectTo:"login",pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
