import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material";
import {MatInputModule} from "@angular/material";
import {MatFormFieldModule} from "@angular/material";
import {MatCardModule} from "@angular/material";
import {MatDividerModule} from "@angular/material";
import {MatCheckboxModule} from "@angular/material";
import {MatSelectModule} from "@angular/material";
import {ActivateAccountComponent} from "./activate-account.component";


@NgModule({
    imports: [
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatDividerModule,
        MatCardModule,
        MatSelectModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        ActivateAccountComponent
    ]
})

export class ActivateAccountModule {

}
