import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ForgotPasswordComponent} from "./forgot-password.component";
import {MatButtonModule} from "@angular/material";
import {MatInputModule} from "@angular/material";
import {MatFormFieldModule} from "@angular/material";
import {MatCardModule} from "@angular/material";
import {MatDividerModule} from "@angular/material";
import {MatCheckboxModule} from "@angular/material";



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
        RouterModule
    ],
    declarations: [
        ForgotPasswordComponent
    ]
})

export class ForgotPasswordModule {

}
