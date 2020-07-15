import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {MatSidenavModule} from "@angular/material";
import {MatProgressBarModule} from "@angular/material";

import {CourseComponent} from "./course.component";
import {CourseViewModule} from "./view/course-view.module";
import {CourseEditModule} from "./edit/course-edit.module";
import {CourseNewModule} from "./new/course-new.module";
import {CourseService} from "./course.service";
import {LessonsService} from "./lessons.service";
import {CourseManageModule} from "./manage/course-manage.module";
import {MarketplaceService} from "./marketplace.service";
import {CoursePreviewModule} from "./preview/course-preview.module";
import {LessonCommentsService} from "./lesson-comments.service";


@NgModule({
    imports: [
        MatSidenavModule,
        MatProgressBarModule,
        CommonModule,
        FormsModule,
        CourseViewModule,
        CourseEditModule,
        CourseManageModule,
        CourseNewModule,
        CoursePreviewModule,
        RouterModule
    ],
    declarations: [
        CourseComponent
    ],
    providers: [
        CourseService,
        LessonsService,
        LessonCommentsService,
        MarketplaceService
    ]
})

export class CourseModule {

}
