import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ProfileHeaderService} from "../header/profile-header.service";
import {ProfileSidebarLeftService} from "../sidebar-left/profile-sidebar-left.service";
import {AuthService} from "../../services/auth.service";
import {Identity} from "../../services/auth.identity.model";
import {TeamsService} from "../teams/teams.service";
import {Get_teams_response, TeamsList} from "../teams/teams.model";
import {User} from "../../shared/User.model";
import {PeopleService} from "./people.service";
import {Get_people_list_response, People_reinvite_response} from "./people.model";
import {MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource, MatSort} from "@angular/material";
import {PeopleEditModalComponent} from "./people-edit-modal/people-edit.modal.component";
import {PeopleDeleteModalComponent} from "./people-delete-modal/people-delete.modal.component";
import {PeopleCreateModalComponent} from "./people-create-modal/people-create.modal.component";
import { PeopleDetailsModalComponent } from "./people-details-modal/people-details.modal.component";
import { SettingsConfig } from "../settings/settings.model";
import { SettingsService } from "../settings/settings.service";
import {Default_modal_700_width} from "../../shared/Modal.model";
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './people.component.html',
    styleUrls: ['./people.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {

    teams: TeamsList = new TeamsList();
    identity: Identity = new Identity();
    config = new SettingsConfig();


    people_ds = new MatTableDataSource<User>();
    people: Array<User> = [];
    userSearch: string = ''; // Filter type

    displayedColumns: Array<string> = ['avatar', 'disp_name', 'email', 'teams',
    'status', 'last_login', 'org_admin', 'actions'];

    private dialog_ref: MatDialogRef<PeopleEditModalComponent | PeopleDetailsModalComponent | PeopleDeleteModalComponent | PeopleCreateModalComponent> = null;

    @ViewChild(MatSort, {static: false}) sort: MatSort;
    constructor(private headerService: ProfileHeaderService,
                private peopleService: PeopleService,
                private sidebarService: ProfileSidebarLeftService,
                private activeRoute: ActivatedRoute,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        // Get People list after render page
        this.identity = this.activeRoute.snapshot.data['identity'];
        this.people = this.activeRoute.snapshot.data['people'];
        this.teams = this.activeRoute.snapshot.data['teams'];
        this.config = this.activeRoute.snapshot.data['config'];

        // Changing title after render page to 'People' //
        this.headerService.changeTitle(this.identity.organisation.name + '\'s People');
        // Change current menu item in left menu to 'people' //
        this.sidebarService.changeCurrentMenuItem('people');
    }

    ngAfterViewInit (){
        this.people_ds = new MatTableDataSource<User>(this.people);
        this.people_ds.sort = this.sort;
        // Sortable table
    }

    resetFilters(){
        this.userSearch = '';
        this.peopleSearchFilter('');
        this.peopleSearchByTeam('');
        this.peopleSearchByStatus('');
    }

    ngOnDestroy() {
        if (this.dialog_ref instanceof MatDialogRef) {
            this.dialog_ref.close();
        }
    }


    peopleSearchFilter(filterValue: string) {
        this.people_ds.filterPredicate = (peoples, filter: string) : any => {
            return peoples.displayName().toLowerCase().includes(filter) // searching by Name
            || peoples.email.toLowerCase().includes(filter)
        };
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.people_ds.filter = filterValue;
    }


    peopleSearchByStatus(filterValue: string){
        let toBoolean = !!filterValue; // true or false
        this.people_ds.filterPredicate = (peoples, filter: string) : any => {
            if(!toBoolean) return peoples.confirm_code;
            if(toBoolean) return !peoples.confirm_code;
        };
        this.people_ds.filter = filterValue;
    }


    peopleSearchByTeam(filterValue: string){
        this.people_ds.filterPredicate = (peoples, filter: string) : any => {
            for(let i = 0; i < peoples.user_teams.length; i++){
                if(peoples.user_teams[i].team.name.toLowerCase().includes(filter)) return true;
            }
        };
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.people_ds.filter = filterValue;
    }


    toggleAdmin(user_id: number, is_admin: boolean) {
        this.peopleService.toggleAdmin(user_id, is_admin)
            .subscribe((resp: Get_people_list_response) => {
                if (resp.success) {
                    this.people = resp.data;
                    this.people_ds = new MatTableDataSource<User>(resp.data);
                }
            });
    }


    openDeleteDialog(user: User) {
        let config: Default_modal_700_width = new Default_modal_700_width().deserialize(user);
        this.dialog_ref = this.dialog.open(PeopleDeleteModalComponent, config);
        this.dialog_ref.afterClosed().subscribe((result: Array<User> | null) => {
            if (result) {
                this.people = result;
                this.people_ds = new MatTableDataSource<User>(result);
            }
        });
    }

    openEditDialog(user: User) {
        let config: Default_modal_700_width = new Default_modal_700_width().deserialize(user);
        this.dialog_ref = this.dialog.open(PeopleEditModalComponent, config);
        this.dialog_ref.afterClosed().subscribe((result: Array<User> | null) => {
            if (result) {
                this.people = result;
                this.people_ds = new MatTableDataSource<User>(result);
            }
        });
    }

    openDetailsDialog(user: User){
        let dialog_conf: MatDialogConfig = new MatDialogConfig();
        dialog_conf.disableClose = true;
        dialog_conf.height = '750px';
        dialog_conf.width = '700px';
        dialog_conf.panelClass = ['people-details-modal'];
        dialog_conf.data = user;
        this.dialog_ref = this.dialog.open(PeopleDetailsModalComponent, dialog_conf);
    }

    openCreateDialog() {
        let config: Default_modal_700_width = new Default_modal_700_width();
        this.dialog_ref = this.dialog.open(PeopleCreateModalComponent, config);
        this.dialog_ref.afterClosed().subscribe((result: Array<User> | null) => {
            if (result) {
                this.people = result;
                this.people_ds = new MatTableDataSource<User>(result);
            }
        });
    }

    reinvite(id: number) {
        this.peopleService.reinviteUser(id)
            .subscribe((resp: People_reinvite_response) => {
                if (resp.success) {
                    // todo: do something if needed
                }
            });
    }

}
