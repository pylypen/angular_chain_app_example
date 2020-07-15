import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatProgressBarModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatListModule, MatSlideToggleModule
} from "@angular/material";

import {CourseEditPublishComponent} from "./course-edit-publish.component";
import {RequestReviewModule} from "./request-review/request-review.module";
import {PublishSettingsModule} from "./publish-settings/publish-settings.module";



@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MatCheckboxModule,
        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,
        RequestReviewModule,
        PublishSettingsModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        CourseEditPublishComponent
    ]
})

export class CourseEditPublishModule {

}
