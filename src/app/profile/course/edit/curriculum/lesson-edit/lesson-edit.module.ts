import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatProgressBarModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatSlideToggleModule, MatListModule,
    MatIconModule,
    MatButtonModule
} from "@angular/material";

import { AngularEditorModule } from '@kolkov/angular-editor';

import {LessonEditComponent} from "./lesson-edit.component";
import {FileUploadModule} from "ng2-file-upload";
import {MatTooltipModule} from '@angular/material/tooltip';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatTableModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatSlideToggleModule,
        MatListModule,
        DragulaModule,
        MatIconModule,
        AngularEditorModule,
        FileUploadModule,
        CommonModule,
        FormsModule,
        RouterModule,
        MatTooltipModule,
        AngularSvgIconModule,
    ],
    declarations: [
        LessonEditComponent
    ]
})

export class LessonEditModule {

}
