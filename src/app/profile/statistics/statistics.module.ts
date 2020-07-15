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
    MatTableModule, MatTabsModule, MatButtonModule
} from "@angular/material";

import {AngularSvgIconModule} from "angular-svg-icon";
import {StatisticsComponent} from "./statistics.component";
import {StatisticsService} from "./statistics.service";
import {StatisticsCoursesModule} from "./statistics-courses/statistics-courses.module";

@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatTableModule,
        MatListModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatTabsModule,
        CommonModule,
        MatButtonModule,
        FormsModule,
        MatSlideToggleModule,
        AngularSvgIconModule,
        StatisticsCoursesModule,
        RouterModule
    ],
    declarations: [
        StatisticsComponent,
    ],
    providers: [
        StatisticsService
    ]
})

export class StatisticsModule {

}
