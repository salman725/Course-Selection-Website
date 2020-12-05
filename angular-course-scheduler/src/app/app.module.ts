import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PublicListsComponent } from './public-lists/public-lists.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';

export class Course {
  constructor(
    public subject: string,
    public catalog_nbr: string,
    public className: string
  ) {

  }
}

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    ScheduleComponent,
    LoginComponent,
    RegisterComponent,
    PasswordChangeComponent,
    PublicListsComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [LoginComponent, AuthGuard,],
  bootstrap: [AppComponent]
})
export class AppModule { }
