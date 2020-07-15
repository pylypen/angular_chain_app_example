import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSortModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatChipsModule,
    MatTabsModule
} from "@angular/material";

import {PeopleComponent} from "./people.component";
import {AngularSvgIconModule} from "angular-svg-icon";
import {PeopleService} from "./people.service";
import {PeopleDeleteModalComponent} from "./people-delete-modal/people-delete.modal.component";
import {PeopleEditModalComponent} from "./people-edit-modal/people-edit.modal.component";
import {PeopleCreateModalComponent} from "./people-create-modal/people-create.modal.component";
import { PeopleDetailsModalComponent } from './people-details-modal/people-details.modal.component';


@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        MatChipsModule,
        MatExpansionModule,
        MatAutocompleteModule,
        MatTableModule,
        MatListModule,
        MatTooltipModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSortModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatTabsModule,
        MatNativeDateModule,
        MatMenuModule,
        CommonModule,
        FormsModule,
        MatSlideToggleModule,
        AngularSvgIconModule,
        RouterModule,
    ],
    declarations: [
        PeopleComponent,
        PeopleDeleteModalComponent,
        PeopleEditModalComponent,
        PeopleCreateModalComponent,
        PeopleDetailsModalComponent
    ],
    entryComponents: [
        PeopleDeleteModalComponent,
        PeopleEditModalComponent,
        PeopleCreateModalComponent,
        PeopleDetailsModalComponent,
    ],
    providers: [
        PeopleService
    ]
})

export class PeopleModule {

}
