import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatProgressBarModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatListModule, MatSlideToggleModule,
    MatDialogModule,
    MatButtonModule
} from "@angular/material";

import {CourseViewListComponent} from "./course-view-list.component";


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
        MatListModule,
        MatSlideToggleModule,
        MatDialogModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        CourseViewListComponent
    ]
})

export class CourseViewListModule {

}
