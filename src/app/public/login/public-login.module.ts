import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {PublicLoginComponent} from "./public-login.component";
import {MatButtonModule, MatSlideToggleModule} from "@angular/material";
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
        MatFormFieldModule,
        MatCheckboxModule,
        MatDividerModule,
        MatCardModule,
        CommonModule,
        FormsModule,
        RouterModule,
        MatSlideToggleModule,
        AngularSvgIconModule
    ],
    declarations: [
        PublicLoginComponent
    ]
})

export class PublicLoginModule {

}
