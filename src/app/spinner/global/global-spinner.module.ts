import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material";
import { GlobalSpinnerComponent } from './global-spinner.component';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSnackBarModule,
        AngularSvgIconModule,
        FormsModule,
    ],
    exports: [
        GlobalSpinnerComponent
    ],
    declarations: [
        GlobalSpinnerComponent,
    ],
    bootstrap: [
        GlobalSpinnerComponent
    ]
})
export class GlobalSpinnerModule {
}
