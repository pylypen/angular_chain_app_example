import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatProgressBarModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatButtonModule
} from "@angular/material";

import {CourseEditDetailsComponent} from "./course-edit-details.component";
import {FileUploadModule} from "ng2-file-upload";


@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        FileUploadModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        CourseEditDetailsComponent
    ]
})

export class CourseEditDetailsModule {

}
