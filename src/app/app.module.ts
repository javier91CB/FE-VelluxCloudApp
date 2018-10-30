import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {Ng2CarouselamosModule} from 'ng2-carouselamos';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { NewsComponent } from './components/news/news.component';
import { ReleasesComponent } from './components/releases/releases.component';
import { AppRoutingModule } from 'src/app/app-routong.module';
import { FullCalendarModule } from 'ng-fullcalendar';
import { EventSesrvice } from './services/calendar/event.service';
import { UsersComponent } from './components/users/users.component';
import { CoWorkerComponent } from './components/co-worker/co-worker.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { RolesComponent } from './components/roles/roles.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ReportsComponent } from './components/reports/reports.component';
import { QualificationComponent } from './components/tools/qualification/qualification.component';
import { LoginService } from './services/login/login.service';
import { UserService } from './services/user/user.service';
import { ProfileService } from './services/profiles/profile.service';
import { PlaceService } from './services/place/place.service';
import { ButtonsService } from './services/buttons/buttons.service';
import { MessagingService } from './services/shared/messaging.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
 import { environment } from 'src/environments/environment';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { NotificationPushComponent } from './components/notification-push/notification-push.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginComponent,
    MenuComponent,
    ProfileComponent,
    AdminComponent,
    HomeComponent,
    NotificationsComponent,
    MessengerComponent,
    NewsComponent,
    ReleasesComponent,
    UsersComponent,
    CoWorkerComponent,
    SchedulerComponent,
    RolesComponent,
    ButtonsComponent,
    ReportsComponent,
    QualificationComponent,
    NotificationPushComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2CarouselamosModule,
    FullCalendarModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    EventSesrvice,
    LoginService,
    UserService,
    ProfileService,
    PlaceService,
    ButtonsService,
    MessagingService,
    AsyncPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
