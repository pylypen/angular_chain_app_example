import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatProgressBarModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatListModule, MatSlideToggleModule, MatButtonModule
} from "@angular/material";

import {CourseViewLessonComponent} from "./course-view-lesson.component";
import {LessonContentModule} from "../../directives/lesson-content/lesson-content.module";
import {MentionModule} from "angular-mentions/mention";


@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatTableModule,
        MatCheckboxModule,
        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,
        MentionModule,
        LessonContentModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        CourseViewLessonComponent
    ]
})

export class CourseViewLessonModule {

}
