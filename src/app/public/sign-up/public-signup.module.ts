import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {PublicSignUpComponent} from "./public-signup.component";
import {MatButtonModule, MatSlideToggleModule, MatStepperModule, MatDatepickerModule, MatRippleModule, MatIconModule, MatTooltipModule} from "@angular/material";
import {MatInputModule} from "@angular/material";
import {MatFormFieldModule} from "@angular/material";
import {MatCardModule} from "@angular/material";
import {MatDividerModule} from "@angular/material";
import {MatCheckboxModule} from "@angular/material";
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
    imports: [
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatDividerModule,
        MatCardModule,
        MatTooltipModule,
        MatRippleModule,
        CommonModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        MatStepperModule,
        RouterModule,
        MatSlideToggleModule,
        AngularSvgIconModule
    ],
    declarations: [
        PublicSignUpComponent
    ]
})

export class PublicSignUpModule {

}
