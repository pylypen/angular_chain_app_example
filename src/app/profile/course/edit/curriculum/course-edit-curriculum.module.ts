import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {CourseEditCurriculumComponent} from "./course-edit-curriculum.component";
import {LessonListModule} from "./lesson-list/lesson-list.module";
import {LessonEditModule} from "./lesson-edit/lesson-edit.module";
import {LessonNewModule} from "./lesson-new/lesson-new.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LessonListModule,
        LessonEditModule,
        LessonNewModule,
        RouterModule
    ],
    declarations: [
        CourseEditCurriculumComponent
    ]
})

export class CourseEditCurriculumModule {

}
