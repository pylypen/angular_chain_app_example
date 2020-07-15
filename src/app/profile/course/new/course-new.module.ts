import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatProgressBarModule, MatTabsModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatButtonModule
} from "@angular/material";

import {CourseNewComponent} from "./course-new.component";


@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MatCheckboxModule,
        MatDividerModule,
        MatButtonModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        CourseNewComponent
    ]
})

export class CourseNewModule {

}
