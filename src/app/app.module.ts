import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import this
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LearningZoneComponent } from './zone/learning-zone/learning-zone.component';
import { SkillZoneComponent } from './zone/skill-zone/skill-zone.component';
import { SkillZoneCategoryComponent } from './zone/skill-zone/skill-zone-category/skill-zone-category.component';
import { LoginComponent } from './auth/login/login.component';
import { InternationalZoneComponent } from './zone/international-zone/international-zone.component';
import { PlacementZoneComponent } from './zone/placement-zone/placement-zone.component';
import { FormsModule } from '@angular/forms';
import { EntrepreneurZoneComponent } from './zone/entrepreneur-zone/entrepreneur-zone.component';
import { EntrepreneurRegistrationComponent } from './zone/entrepreneur-zone/entrepreneur-registration/entrepreneur-registration.component';
import { InternationalRegistrationComponent } from './zone/international-zone/international-registration/international-registration.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HomeComponent } from './home/home.component';
import { LearningZoneCategoryComponent } from './zone/learning-zone/learning-zone-category/learning-zone-category.component';
import { ComingSoonComponent } from './shared/coming-soon/coming-soon.component';
import { ZoneArticlesComponent } from './shared/zone-articles/zone-articles.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { SafeUrlPipe } from './shared/safe-url.pipe';
import { AssessmentComponent } from './shared/assessment/assessment.component';
import { LayoutModule } from '@angular/cdk/layout';
import { YourWishlistComponent } from './zone/learning-zone/your-wishlist/your-wishlist.component';
import { CommonModule } from '@angular/common';
import { ZoneService } from './services/zone.service';
import { YourJobProfileComponent } from './zone/placement-zone/your-job-profile/your-job-profile.component';
import { ViewAllJobsComponent } from './zone/placement-zone/view-all-jobs/view-all-jobs.component';
import { CareerFestComponent } from './zone/placement-zone/career-fest/career-fest.component';
import { CareerEvaluationComponent } from './zone/placement-zone/career-evaluation/career-evaluation.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LearningZoneComponent,
    SkillZoneComponent,
    SkillZoneCategoryComponent,
    LoginComponent,
    InternationalZoneComponent,
    PlacementZoneComponent,
    EntrepreneurZoneComponent,
    EntrepreneurRegistrationComponent,
    InternationalRegistrationComponent,
    LeaderboardComponent,
    HomeComponent,
    LearningZoneCategoryComponent,
    ComingSoonComponent,
    ZoneArticlesComponent,
    LoaderComponent,
    SafeUrlPipe,
    AssessmentComponent,
    YourWishlistComponent,
    YourJobProfileComponent,
    ViewAllJobsComponent,
    CareerFestComponent,
    CareerEvaluationComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    CommonModule,
  ],
  providers: [ZoneService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }