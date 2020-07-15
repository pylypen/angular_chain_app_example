import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AngularSvgIconModule} from 'angular-svg-icon';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {
    MatCardModule, MatProgressBarModule, MatSidenavModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatAutocompleteModule, MatChipsModule, MatIconModule, MatButtonModule, MatExpansionModule, MatTooltipModule, MatRippleModule
} from "@angular/material";

import {TeamsComponent} from "./teams.component";
import {TeamsService} from "./teams.service";
import {TeamMembersModalComponent} from "./team-members-modal/team-members.modal.component";
import {TeamSettingsModalComponent} from "./team-settings-modal/team-settings.modal.component";
import {FileUploadModule} from "ng2-file-upload";
import { TeamsFilterPipe } from './teams.pipe';
import { TeamUsersFilterPipe } from './team-users.pipe';



@NgModule({
    imports: [
        AngularSvgIconModule,
        MatCardModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatButtonModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatIconModule,
        CommonModule,
        MatRippleModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FileUploadModule,
        MatTooltipModule,
    ],
    declarations: [
        TeamsComponent,
        TeamMembersModalComponent,
        TeamSettingsModalComponent,
        TeamsFilterPipe,
        TeamUsersFilterPipe,
    ],
    entryComponents: [
        TeamMembersModalComponent,
        TeamSettingsModalComponent
    ],
    providers: [
        TeamsService
    ]
})

export class TeamsModule {

}
