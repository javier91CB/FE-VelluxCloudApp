import {Routes, RouterModule } from '@angular/router';
import {CalendarComponent} from './components/calendar/calendar.component';
import {LoginComponent} from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'menu', component: MenuComponent},
    { path: 'full-calendar', component: CalendarComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'notifications', component: NotificationsComponent},
    { path: 'admin', component: AdminComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const AppRoutingModule = RouterModule.forRoot(routes);
