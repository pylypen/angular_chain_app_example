import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {RequestReviewComponent} from "./request-review.component";
import {
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatButtonModule
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
        MatButtonModule,
        MatListModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        RequestReviewComponent
    ]
})

export class RequestReviewModule {

}
