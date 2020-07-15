import {Component, OnDestroy, OnInit, ViewChildren} from "@angular/core";
import {ProfileHeaderService} from "../header/profile-header.service";
import {ProfileSidebarLeftService} from "../sidebar-left/profile-sidebar-left.service";
import {Identity} from "../../services/auth.identity.model";
import {Courses_list, Get_courses_list_response} from "./courses.model";
import {AuthService} from "../../services/auth.service";
import {CoursesService} from "./courses.service";
import {Request_certificate_response} from "../profile.model";
import {ProfileService} from "../profile.service";
import {EmailCertModalComponent} from "../email-cert-modal/email-cert.modal.component";
import {MatDialog, MatDialogRef} from "@angular/material";
import { TeamsService } from "../teams/teams.service";
import { TeamsList, Get_teams_response } from "../teams/teams.model";
import { Default_modal_400_width } from "../../shared/Modal.model";
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit, OnDestroy {

    identity: Identity;
    courses: Courses_list = new Courses_list();

    private dialog_ref: MatDialogRef<EmailCertModalComponent> = null;

    teams: TeamsList = new TeamsList();

    userSearch: string = '';// Filter type
    searchText: string = ''; // Search by text
    searchTeam: number = null; // Search by team id
    constructor(
        private headerService: ProfileHeaderService,
        private sidebarService: ProfileSidebarLeftService,
        private authService: AuthService,
        private coursesService: CoursesService,
        private teamsService: TeamsService,
        private activeRoute: ActivatedRoute,
        private profileService: ProfileService,
        private dialog: MatDialog) {


    }
    ngOnInit() {
        // Page data init
        this.headerService.changeTitle('Courses');
        this.sidebarService.changeCurrentMenuItem('courses');

        // Resolvers data init
        this.identity = this.activeRoute.snapshot.data['identity'];
        this.courses = this.activeRoute.snapshot.data['courses'];
        this.teams = this.activeRoute.snapshot.data['teams'];
    }

    ngOnDestroy() {
        if (this.dialog_ref instanceof MatDialogRef) this.dialog_ref.close();
    }

    public requestCertificate(course_id: number): void {
        this.profileService.requestCertificate(course_id).subscribe((response: Request_certificate_response) => {
                if (response.success) window.open(response.data);
        })
    }

    public requestEmailCertificate(course_id: number): void {
        let config: Default_modal_400_width = new Default_modal_400_width().deserialize(course_id);
        this.dialog_ref = this.dialog.open(EmailCertModalComponent, config);
    }

    public resetFilters(){
        this.userSearch = '';
        this.searchText = '';
        this.searchTeam = null;
    }

}
