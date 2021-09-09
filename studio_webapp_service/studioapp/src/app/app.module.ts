import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { DomainComponent } from './home/domain/domain.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateNodeDialogComponent } from './home/create-node-dialog/create-node-dialog.component';
import { DomainStudioComponent } from './home/domain-studio/domain-studio.component';
import { JourneygraphComponent } from './home/journeygraph/journeygraph.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { JourneyComponent } from './home/journey/journey.component';
import { JobCategoryComponent } from './home/job-category/job-category.component';
import { LearningCategoryComponent } from './home/learning-category/learning-category.component';

import { NodeComponent } from './home/node/node.component';
import { NodeCategoriesListComponent } from './home/node-categories-list/node-categories-list.component';
import { NodeCategoryComponent } from './home/node-category/node-category.component';
import { JourneyviewComponent } from './home/journeyview/journeyview.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddDomainsComponent } from './home/add-domains/add-domains.component';

import { NodesListComponent } from './home/nodes-list/nodes-list.component';
import { StudioComponent } from './home/studio/studio.component';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { UserProfileDisplayComponent } from './home/user-profile-display/user-profile-display.component';
// import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NodeDetailDialogComponent } from './home/node-detail-dialog/node-detail-dialog.component';
import { ChartsModule } from 'ng2-charts';
import { LearningDetailComponent } from './home/learning-detail/learning-detail.component';
import { JobDetailComponent } from './home/job-detail/job-detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UpdateNodeDialogComponent } from './home/update-node-dialog/update-node-dialog.component';
import {MatChipsModule} from '@angular/material/chips';
import { ElevationDirective } from './utils/elevation.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DomainComponent,
    LoginComponent,
    HeaderComponent,
    CreateNodeDialogComponent,
    DomainStudioComponent,
    JourneyComponent,
    JourneygraphComponent,
    JourneyviewComponent,
    AddDomainsComponent,
    NodesListComponent,
    JobCategoryComponent,
    LearningCategoryComponent,
    NodeComponent,
    NodeCategoriesListComponent,
    NodeCategoryComponent,
    NodesListComponent,
    StudioComponent,
    UserProfileComponent,
    UserProfileDisplayComponent,
    NodeDetailDialogComponent,
    LearningDetailComponent,
    JobDetailComponent,
    ElevationDirective,
    UpdateNodeDialogComponent

  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxGraphModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    ChartsModule,
    Ng2SearchPipeModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
