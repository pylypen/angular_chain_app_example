import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatProgressBarModule, MatTabsModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatListModule, MatTooltipModule
} from "@angular/material";
import {AngularSvgIconModule} from 'angular-svg-icon';

import {VgBufferingModule} from "videogular2/buffering";
import {VgOverlayPlayModule} from "videogular2/overlay-play";
import {VgControlsModule} from "videogular2/controls";
import {VgCoreModule} from "videogular2/core";
import {LessonContentComponent} from "./lesson-content.component";
import { SanitizeHtmlPipe } from './lesson-content.pipe';


@NgModule({
    imports: [
        AngularSvgIconModule,
        MatCardModule,
        MatProgressBarModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MatCheckboxModule,
        MatDividerModule,
        MatListModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        CommonModule,
        FormsModule,
        RouterModule,
        MatTooltipModule,
    ],
    declarations: [
        LessonContentComponent,
        SanitizeHtmlPipe,
    ],
    exports: [
        LessonContentComponent
    ]
})

export class LessonContentModule {

}
