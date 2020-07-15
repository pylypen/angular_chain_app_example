import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatProgressBarModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatListModule, MatSlideToggleModule,
    MatExpansionModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTooltipModule
} from "@angular/material";
import {CourseManageProgressComponent} from "./course-manage-progress.component";
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatTooltipModule,
        MatExpansionModule,
        MatTableModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatMenuModule,
        CommonModule,
        FormsModule,
        MatSlideToggleModule,
        AngularSvgIconModule,
        RouterModule,
    ],
    declarations: [
       CourseManageProgressComponent
    ]
})

export class CourseManageProgressModule {

}
