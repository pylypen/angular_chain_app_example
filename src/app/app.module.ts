import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {PublicModule} from "./public/public.module";
import {ProfileModule} from "./profile/profile.module";
import {HttpClientModule} from "@angular/common/http";
import { AngularSvgIconModule } from 'angular-svg-icon';
import {GlobalSpinnerService} from "./spinner/global/global-spinner.service";
import {MatSnackBarModule} from "@angular/material";
import { PageNotFoundModule } from './error/page-not-found/page-not-found.module';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSnackBarModule,
        FormsModule,
        PublicModule,
        ProfileModule,
        PageNotFoundModule,
        AngularSvgIconModule,
        AppRoutingModule
    ],
    exports: [
        AppComponent
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        GlobalSpinnerService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
