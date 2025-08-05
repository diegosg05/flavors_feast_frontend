import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Carta } from './pages/carta/carta';
import { Tienda } from './pages/tienda/tienda';
import { Reserva } from './pages/reserva/reserva';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AuthGuard } from './services/auth-guard';
import { Profile } from './pages/profile/profile';
import { Carrito } from './pages/carrito/carrito';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'carta', component: Carta},
    {path: 'tienda', component: Tienda},
    {path: 'reserva', component: Reserva, canActivate: [AuthGuard]},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'profile', component: Profile, canActivate: [AuthGuard]},
    {path: 'carrito', component: Carrito, canActivate: [AuthGuard]},
    {path: '**', redirectTo: ''}
];
