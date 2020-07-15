import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicComponent} from "./public.component";
import {PublicLandingComponent} from "./landing/public-landing.component";
import {PageNotFoundComponent} from "../error/page-not-found/page-not-found.component";
import {PublicLoginComponent} from "./login/public-login.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {ActivateAccountComponent} from "./activate-account/activate-account.component";
import { PublicSignUpComponent } from './sign-up/public-signup.component';


const publicRoutes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: 'login',
        component: PublicComponent,
        children: [
            {path: '', component: PublicLoginComponent},
            {path: '**', redirectTo: '/not-found', pathMatch: 'full'}
        ]
    }, {
        path: 'welcome',
        component: PublicComponent,
        children: [
            {path: '', component: PublicLandingComponent},
            {path: '**', redirectTo: '/not-found', pathMatch: 'full'}
        ]
    },
    {
        path: 'forgot-password',
        component: PublicComponent,
        children: [
            {path: '', component: ForgotPasswordComponent},
            {path: '**', redirectTo: '/not-found', pathMatch: 'full'}
        ]
    },
    {
        path: 'sign-up',
        component: PublicComponent,
        children: [
            {path: '', component: PublicSignUpComponent},
            {path: '**', redirectTo: '/not-found', pathMatch: 'full'}
        ]
    },
    {
        path: 'reset-password',
        component: PublicComponent,
        children: [
            {path: '', component: ResetPasswordComponent},
            {path: ':token', component: ResetPasswordComponent},
            {path: '**', redirectTo: '/not-found', pathMatch: 'full'}
        ]
    },
    {
        path: 'activate-account',
        component: PublicComponent,
        children: [
            {path: '', component: ActivateAccountComponent},
            {path: ':code', component: ActivateAccountComponent},
            {path: '**', redirectTo: '/not-found', pathMatch: 'full'}
        ]
    },
    {
        path: 'not-found',
        component: PublicComponent,
        children: [
            {path: '', component: PageNotFoundComponent},
            {path: '**', redirectTo: '/not-found', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(publicRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PublicRoutingModule {
}