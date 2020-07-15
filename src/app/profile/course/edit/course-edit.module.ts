import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule,
    MatTabsModule,
    MatRippleModule,
} from "@angular/material";

import {CourseEditComponent} from "./course-edit.component";
import {CourseEditDetailsModule} from "./details/course-edit-details.module";
import {CourseEditCurriculumModule} from "./curriculum/course-edit-curriculum.module";
import {CourseEditPublishModule} from "./publish/course-edit-publish.module";
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
    imports: [
        MatTabsModule,
        MatCardModule,
        CommonModule,
        FormsModule,
        CourseEditDetailsModule,
        CourseEditCurriculumModule,
        CourseEditPublishModule,
        RouterModule,
        AngularSvgIconModule,
        MatRippleModule,
    ],
    declarations: [
        CourseEditComponent
    ]
})

export class CourseEditModule {

}
