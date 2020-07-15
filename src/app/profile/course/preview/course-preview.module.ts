import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatProgressBarModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatListModule
} from "@angular/material";

import {LessonContentModule} from "../directives/lesson-content/lesson-content.module";
import {CoursePreviewComponent} from "./course-preview.component";
import {MatButtonModule} from "@angular/material/button";

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

        LessonContentModule,

        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        CoursePreviewComponent
    ]
})

export class CoursePreviewModule {

}
