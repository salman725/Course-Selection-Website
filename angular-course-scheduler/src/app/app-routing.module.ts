import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'user/:data.token', component: ScheduleComponent},
    {path:'password-change', component: PasswordChangeComponent},
    {path: 'admin/:data.token', component: AdminComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
