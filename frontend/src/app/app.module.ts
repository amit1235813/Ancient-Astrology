import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { SignupService } from './services/signup.service';
import { LoginService } from './services/login.service';
import { AuthorizeService } from './services/authorize.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoAccessComponent } from './no-access/no-access.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    SignupComponent,
    LoginComponent,
    WelcomeComponent,
    SidebarComponent,
    ContentComponent,
    ContactComponent,
    NotFoundComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
        {
          path: '',
          component: LoginComponent
        },
        {
          path: 'me',
          component: WelcomeComponent
        },
        {
          path: 'signup',
          component: SignupComponent
        }
        //{path: '**', component: NotFoundComponent},
      ]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SignupService,
    LoginService,
    AuthorizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
