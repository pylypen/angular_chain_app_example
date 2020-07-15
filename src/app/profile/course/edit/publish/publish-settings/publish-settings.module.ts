import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {PublishSettingsComponent} from "./publish-settings.component";
import {
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule, MatRadioButton,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule
} from "@angular/material";


@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatTableModule,
        MatCheckboxModule,
        MatDividerModule,
        MatSlideToggleModule,
        MatListModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        PublishSettingsComponent
    ]
})

export class PublishSettingsModule {

}
