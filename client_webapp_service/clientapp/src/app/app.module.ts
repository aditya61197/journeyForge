import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DomainComponent } from './home/domain/domain.component';
import { HeaderComponent } from './home/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {NgxGraphModule} from "@swimlane/ngx-graph";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { JourneyComponent } from './home/journey/journey.component';
import { JourneymgmtComponent } from './home/journeymgmt/journeymgmt.component';
import { LikeComponent } from './home/journey/like/like.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NodeDetailsComponent } from './home/node-details/node-details.component';
import { JobCategoryViewComponent } from './home/job-category-view/job-category-view.component';
import { LearningCategoryViewComponent } from './home/learning-category-view/learning-category-view.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ElevationDirective } from './utils/elevation.directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatIconModule} from '@angular/material/icon';
import { CarouselComponent } from './home/domain/carousel/carousel.component';
import { ChartsModule } from 'ng2-charts';
import { AboutComponent } from '././home/about/about.component';
import { FooterComponent } from './home/footer/footer.component';
import { SkillsInputDialogComponent } from './home/skills-input-dialog/skills-input-dialog.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DomainComponent,
    HeaderComponent,
    DomainComponent,
    JourneyComponent,
    JourneymgmtComponent,
    LikeComponent,
    NodeDetailsComponent,
    JobCategoryViewComponent,
    LearningCategoryViewComponent,
    ElevationDirective,
    CarouselComponent,
    AboutComponent,
    FooterComponent,
    SkillsInputDialogComponent,
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    TooltipModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxGraphModule,
    NgxChartsModule,
    MatTooltipModule,
    MatDialogModule,
    HttpClientModule,
    FlexLayoutModule,
    Ng2SearchPipeModule,
    FormsModule,
    MatIconModule,
    MaterialModule,
    ChartsModule
  ],

  // providers: [ CookieService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule { }
