import { Routes,RouterModule } from '@angular/router';
import { LogoutComponent } from './logout.component';
import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';       

const AUTH_ROUTS: Routes = [
	{ path: '',redirectTo: 'signup', pathMatch: 'full' },
	{ path: 'signup', component: SignupComponent },
	{ path: 'signin', component: SigninComponent },
	{ path: 'logout', component: LogoutComponent }
];

export const authRouting = RouterModule.forChild(AUTH_ROUTS);
