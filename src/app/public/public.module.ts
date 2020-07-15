import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {PublicComponent} from "./public.component";
import {PublicRoutingModule} from "./public-routing.module";
import {PublicLandingModule} from "./landing/public-landing.module";
import {PublicLoginModule} from "./login/public-login.module";
import {AuthService} from "../services/auth.service";
import {ForgotPasswordModule} from "./forgot-password/forgot-password.module";
import {ForgotPasswordService} from "./forgot-password/forgot-password.service";
import {ResetPasswordService} from "./reset-password/reset-password.service";
import {ResetPasswordModule} from "./reset-password/reset-password.module";
import {MatToolbarModule} from "@angular/material";
import {ActivateAccountService} from "./activate-account/activate-account.service";
import {ActivateAccountModule} from "./activate-account/activate-account.module";
import {SystemService} from "../services/system.service";
import {PublicSignUpModule} from "./sign-up/public-signup.module";
import { GlobalSpinnerModule } from '../spinner/global/global-spinner.module';
import { PageNotFoundModule } from '../error/page-not-found/page-not-found.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AngularSvgIconModule,
        MatToolbarModule,
        ReactiveFormsModule,
        PublicLandingModule,
        PublicLoginModule,
        PublicSignUpModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        ActivateAccountModule,
        PublicRoutingModule,
        GlobalSpinnerModule,
        PageNotFoundModule,
    ],
    declarations: [
        PublicComponent
    ],
    providers: [
        AuthService,
        SystemService,
        ForgotPasswordService,
        ResetPasswordService,
        ActivateAccountService
    ]
})
export class PublicModule {
}
