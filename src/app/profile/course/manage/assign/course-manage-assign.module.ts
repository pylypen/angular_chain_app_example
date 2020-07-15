import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatProgressBarModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatListModule, MatSlideToggleModule,
    MatExpansionModule,
    MatButtonModule
} from "@angular/material";

import {CourseManageAssignComponent} from "./course-manage-assign.component";




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
        MatButtonModule,
        MatSlideToggleModule,
        MatExpansionModule,
        MatListModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        CourseManageAssignComponent
    ]
})

export class CourseManageAssignModule {

}
