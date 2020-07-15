import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule,
    MatTabsModule,
    MatDividerModule
} from "@angular/material";

import {CourseManageComponent} from "./course-manage.component";
import {CourseManageAssignModule} from "./assign/course-manage-assign.module";
import {CourseManageReviewModule} from "./review/course-manage-review.module";
import {CourseManageProgressModule} from "./progress/course-manage-progress.module";
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
    imports: [
        MatTabsModule,
        MatCardModule,
        MatDividerModule,
        CommonModule,
        FormsModule,
        CourseManageAssignModule,
        CourseManageReviewModule,
        CourseManageProgressModule,
        RouterModule,
        AngularSvgIconModule,
    ],
    declarations: [
        CourseManageComponent
    ]
})

export class CourseManageModule {

}
