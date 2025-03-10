import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillZoneComponent } from './zone/skill-zone/skill-zone.component';
import { LearningZoneComponent } from './zone/learning-zone/learning-zone.component';
import { SkillZoneCategoryComponent } from './zone/skill-zone/skill-zone-category/skill-zone-category.component';
import { LoginComponent } from './auth/login/login.component';
import { InternationalZoneComponent } from './zone/international-zone/international-zone.component';
import { PlacementZoneComponent } from './zone/placement-zone/placement-zone.component';
import { EntrepreneurZoneComponent } from './zone/entrepreneur-zone/entrepreneur-zone.component';
import { InternationalRegistrationComponent } from './zone/international-zone/international-registration/international-registration.component';
import { EntrepreneurRegistrationComponent } from './zone/entrepreneur-zone/entrepreneur-registration/entrepreneur-registration.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LearningZoneCategoryComponent } from './zone/learning-zone/learning-zone-category/learning-zone-category.component';
import { ComingSoonComponent } from './shared/coming-soon/coming-soon.component';
import { AssessmentComponent } from './shared/assessment/assessment.component';
import { ZoneArticlesComponent } from './shared/zone-articles/zone-articles.component';
import { YourWishlistComponent } from './zone/learning-zone/your-wishlist/your-wishlist.component';
import { YourJobProfileComponent } from './zone/placement-zone/your-job-profile/your-job-profile.component';
import { CareerFestComponent } from './zone/placement-zone/career-fest/career-fest.component';
import { ViewAllJobsComponent } from './zone/placement-zone/view-all-jobs/view-all-jobs.component';
import { CareerEvaluationComponent } from './zone/placement-zone/career-evaluation/career-evaluation.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'home',
    component: HomeComponent, // Default path redirects to home/manin page
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  {
    path: 'international-zone',
    component: InternationalZoneComponent,
  },

  {
    path: 'international-zone/article/register',
    component: InternationalRegistrationComponent,
  },
  {
    path: 'entrepreneur-zone',
    component: EntrepreneurZoneComponent,
  },

  {
    path: 'entrepreneur-zone/article/register',
    component: EntrepreneurRegistrationComponent,
  },
  {
    path: 'placement-zone',
    component: PlacementZoneComponent,
  },
  {
    path: 'skill-zone',
    component: SkillZoneComponent,
  },
  {
    path: 'learning-zone',
    component: LearningZoneComponent,
  },

  {
    path: 'skill-zone-category/:id/:title',
    component: SkillZoneCategoryComponent,
  },

  {
    path: 'learning-zone-category/:id/:title',
    component: LearningZoneCategoryComponent,
  },


  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'coming-soon', component: ComingSoonComponent },
  { path: 'assessment', component: AssessmentComponent },
  { path: 'article', component: ZoneArticlesComponent },
  { path: 'your-job', component: LearningZoneComponent },
  { path: 'your-wishlist', component: YourWishlistComponent },
  { path: 'your-job-profile', component: YourJobProfileComponent },
  { path: 'career-fest', component: CareerFestComponent },
  { path: 'view-all-jobs', component: ViewAllJobsComponent },
  { path: 'career-evaluation', component: CareerEvaluationComponent },
  { path: 'your-profile', component: ProfileComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
