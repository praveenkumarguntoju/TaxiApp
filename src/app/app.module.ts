import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { routing } from './routing';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { DropdownComponent } from './dropdown/dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    HomeComponent,
    RegisterComponent,
    DropdownDirective,
    DropdownDirective,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
