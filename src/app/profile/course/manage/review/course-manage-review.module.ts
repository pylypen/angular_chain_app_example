import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatProgressBarModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatListModule, MatSlideToggleModule,
    MatDialogModule,
    MatButtonModule
} from "@angular/material";

import {CourseManageReviewComponent} from "./course-manage-review.component";
import {ApproveSettingsModalComponent} from "./approve-settings-modal/approve-settings.modal.component";
import {LessonContentModule} from "../../directives/lesson-content/lesson-content.module";


@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MatCheckboxModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,
        MatDialogModule,
        LessonContentModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        CourseManageReviewComponent,
        ApproveSettingsModalComponent
    ],
    entryComponents: [
        ApproveSettingsModalComponent
    ]
})

export class CourseManageReviewModule {

}
