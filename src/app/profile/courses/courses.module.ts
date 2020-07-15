import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {MatCardModule, MatDialogModule, MatProgressBarModule, MatSidenavModule, MatButtonModule, MatExpansionModule, MatFormFieldModule, MatFormFieldControl, MatInputModule, MatIconModule, MatAutocompleteModule, MatSelectModule} from "@angular/material";

import {CoursesComponent} from "./courses.component";
import {CoursesService} from "./courses.service";
import { CoursesFilterPipe, CoursesFilterByIDPipe } from './courses.pipe';
@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatButtonModule,
        CommonModule,
        MatIconModule,
        MatSelectModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        CoursesComponent,
        CoursesFilterPipe, // Search pipe by name
        CoursesFilterByIDPipe
    ],
    providers: [
        CoursesService
    ]
})

export class CoursesModule {

}
