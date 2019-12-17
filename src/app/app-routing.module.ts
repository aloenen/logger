import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
  {path:  "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "contact-list", component: ContactListComponent},
  {path: "stats", component: StatsComponent},
  {path: "event-list", component: EventListComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
