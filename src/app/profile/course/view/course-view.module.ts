import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatProgressBarModule, MatTabsModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatButtonModule
} from "@angular/material";

import {CourseViewComponent} from "./course-view.component";
import {CourseViewListModule} from "./list/course-view-list.module";
import {CourseViewLessonModule} from "./lesson/course-view-lesson.module";


@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,


        CourseViewListModule,
        CourseViewLessonModule,

        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        CourseViewComponent
    ]
})

export class CourseViewModule {

}
