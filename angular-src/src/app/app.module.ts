import { FilterByPipe } from './filter-by.pipe';
// Angular stuff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Services + Guards
import { AuthService } from './auth.service';
import { BookService } from './book.service';
import { AuthGuard } from './auth.guard';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { RequestsComponent } from './requests/requests.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { AddBookComponent } from './add-book/add-book.component';

const appRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "requests", component: RequestsComponent, canActivate: [AuthGuard] },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard] },
  { path: "my-books", component: MyBooksComponent, canActivate: [AuthGuard] },
  { path: "add-book", component: AddBookComponent, canActivate: [AuthGuard] },
  { path: "**", component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    SettingsComponent,
    RequestsComponent,
    MyBooksComponent,
    AddBookComponent,
    FilterByPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
