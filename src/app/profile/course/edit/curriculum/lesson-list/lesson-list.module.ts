import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatProgressBarModule, MatTabsModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatButtonModule, MatIconModule, MatRippleModule, MatTooltipModule
} from "@angular/material";

import {LessonListComponent} from "./lesson-list.component";
import {AngularSvgIconModule} from "angular-svg-icon";
import {DragulaModule} from "ng2-dragula";


@NgModule({
    imports: [
        AngularSvgIconModule,
        DragulaModule,
        MatCardModule,
        MatProgressBarModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatRippleModule,
        MatSelectModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatDividerModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        LessonListComponent
    ]
})

export class LessonListModule {

}
