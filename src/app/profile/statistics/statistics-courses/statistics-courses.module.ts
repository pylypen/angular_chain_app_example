import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
} from "@angular/material";

import {AngularSvgIconModule} from "angular-svg-icon";
import {StatisticsCoursesComponent} from "./statistics-courses.component";



@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatTableModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
        CommonModule,
        FormsModule,
        MatSlideToggleModule,
        AngularSvgIconModule,
        RouterModule
    ],
    declarations: [
        StatisticsCoursesComponent,
    ]
})

export class StatisticsCoursesModule {

}
