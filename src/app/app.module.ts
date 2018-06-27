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
    ReleasesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2CarouselamosModule,
    FullCalendarModule
  ],
  providers: [
    EventSesrvice
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
