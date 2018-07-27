import {Routes, RouterModule } from '@angular/router';
import {CalendarComponent} from './components/calendar/calendar.component';
import {LoginComponent} from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AdminComponent } from './components/admin/admin.component';
import { CoWorkerComponent } from './components/co-worker/co-worker.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RolesComponent } from './components/roles/roles.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { QualificationComponent } from './components/tools/qualification/qualification.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'menu', component: MenuComponent},
    { path: 'full-calendar', component: CalendarComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'notifications', component: NotificationsComponent},
    { path: 'admin', component: AdminComponent},
    { path: 'co-worker', component: CoWorkerComponent},
    { path: 'buttons', component: ButtonsComponent},
    { path: 'reports', component: ReportsComponent},
    { path: 'roles', component: RolesComponent},
    { path: 'scheduler', component: SchedulerComponent},
    { path: 'qualification', component: QualificationComponent},
    { path: 'users', component: UsersComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const AppRoutingModule = RouterModule.forRoot(routes);
