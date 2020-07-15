import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {LessonNewComponent} from "./lesson-new.component";
import {
    MatCardModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatProgressBarModule,
    MatSelectModule, MatSlideToggleModule, MatTableModule, MatButtonModule
} from "@angular/material";


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
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        LessonNewComponent
    ]
})

export class LessonNewModule {

}
