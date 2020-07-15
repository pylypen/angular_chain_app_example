import {Component, OnInit, AfterViewInit} from "@angular/core";
import {TeamsService} from "./teams.service";
import {Get_teams_response, TeamsList} from "./teams.model";
import {ProfileHeaderService} from "../header/profile-header.service";
import {ProfileSidebarLeftService} from "../sidebar-left/profile-sidebar-left.service";

import {MatDialog, MatDialogRef} from '@angular/material';
import {TeamSettingsModalComponent} from "./team-settings-modal/team-settings.modal.component";
import {TeamMembersModalComponent} from "./team-members-modal/team-members.modal.component";
import {AuthService} from "../../services/auth.service";
import {Identity} from "../../services/auth.identity.model";
import { User } from "../../shared/User.model";
import { PeopleService } from "../people/people.service";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import {map, startWith} from 'rxjs/operators';
import { Default_modal_700_width } from "../../shared/Modal.model";
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.scss']
})

export class TeamsComponent implements OnInit {

    teams: TeamsList = new TeamsList();
    identity: Identity;

    people: Array<User> = [];

    filteredUsers: Observable<Array<User>>;

    dialog_ref: MatDialogRef<any>;

    usersFormControl = new FormControl();

    userName: string = '';
    constructor(
        private headerService: ProfileHeaderService,
        private sidebarService: ProfileSidebarLeftService,
        private teamService: TeamsService,
        private activeRoute: ActivatedRoute,
        private authService: AuthService,
        private dialog: MatDialog) {

        this.identity = this.authService.getCurrentUser();
    }

    ngOnInit() {
        // Component data init
        this.headerService.changeTitle('Teams');
        this.sidebarService.changeCurrentMenuItem('teams');


        // Resolvers data Init
        this.identity = this.activeRoute.snapshot.data['identity'];
        this.teams = this.activeRoute.snapshot.data['teams'];
        this.people = this.activeRoute.snapshot.data['people'];

        this.filteredUsers = this.usersFormControl.valueChanges
            .pipe(startWith(''),map(value => this._usersFilter(value)));


    }

    public resetFilters(){
        this.userName = '';
    }


    private _usersFilter(value: string): any[]{
        const filterValue = value.toLowerCase();
        return this.people.filter(user => user.displayName().toLowerCase().includes(filterValue));
    }

    private getTeamsData(): void {
        this.teamService.getTeamsList().subscribe(
            (result: Get_teams_response) => {
                if (result.success) {
                    this.teams = result.data;
                }
            }
        )
    }

    private subscribeForDialogClose(): void {
        this.dialog_ref.afterClosed().subscribe(result => {
            this.getTeamsData();
        });
    }

    openTeamSettingsDialog(team_id: number | boolean) {
        let config: Default_modal_700_width = new Default_modal_700_width().deserialize({team_id: team_id});
        this.dialog_ref = this.dialog.open(TeamSettingsModalComponent, config);
        this.subscribeForDialogClose();
    }

    openTeamMembersDialog(team_id: number) {
        let config: Default_modal_700_width = new Default_modal_700_width().deserialize({team_id: team_id});
        this.dialog_ref = this.dialog.open(TeamMembersModalComponent, config);
        this.subscribeForDialogClose();
    }
}
