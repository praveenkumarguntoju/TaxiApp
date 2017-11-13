
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { RegisterComponent } from './register/register.component';
import { loginComponent } from './loginuser/login.component';
import { UserTravelComponent } from './usertravel/usertravel.component';
const App_Routes: Routes = [
    {
        path: 'login',
        component: loginComponent
    },
    {
        path: 'usertravel',
        component: UserTravelComponent
    },
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