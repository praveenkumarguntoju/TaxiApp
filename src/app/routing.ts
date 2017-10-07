
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { RegisterComponent } from './register/register.component';
const App_Routes: Routes = [
{
     path: 'home',
     component: HomeComponent
},
{
    path: 'details/:id',
    component: DetailComponent
},
{
    path: 'register',
    component: RegisterComponent
}
];

export const routing = RouterModule.forRoot(App_Routes);