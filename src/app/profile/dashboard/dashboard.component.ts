import {Component, OnDestroy, OnInit, TemplateRef} from "@angular/core";
import {ProfileHeaderService} from "../header/profile-header.service";
import {ProfileSidebarLeftService} from "../sidebar-left/profile-sidebar-left.service";
import {AuthService} from "../../services/auth.service";
import {Identity} from "../../services/auth.identity.model";
import {CoursesService} from "../courses/courses.service";
import {Courses_list, Get_courses_list_response} from "../courses/courses.model";
import {TeamsService} from "../teams/teams.service";
import {Get_teams_response, TeamsList} from "../teams/teams.model";
import {ProfileService} from "../profile.service";
import {Request_certificate_response} from "../profile.model";
import {EmailCertModalComponent} from "../email-cert-modal/email-cert.modal.component";
import {MatDialog, MatDialogRef, MatDialogConfig} from "@angular/material";
import { SettingsService } from "../settings/settings.service";
import { SettingsConfig } from "../settings/settings.model";
import { PeopleCreateModalComponent } from "../people/people-create-modal/people-create.modal.component";
import { TeamSettingsModalComponent } from "../teams/team-settings-modal/team-settings.modal.component";
import {GlobalSpinnerService} from "../../spinner/global/global-spinner.service";
import { Default_modal_400_width, Default_modal_700_width } from "../../shared/Modal.model";
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    teams: TeamsList = new TeamsList();
    identity: Identity = new Identity();
    courses: Courses_list = new Courses_list();
    config = new SettingsConfig();

    private dialog_ref: MatDialogRef<EmailCertModalComponent> = null;
    private dialog_entry: MatDialogRef<PeopleCreateModalComponent | TeamSettingsModalComponent> = null;
    constructor(private headerService: ProfileHeaderService,
                private sidebarService: ProfileSidebarLeftService,
                private profileService: ProfileService,
                private activatedRoute: ActivatedRoute,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        // Init Data
        this.headerService.changeTitle('Profile Dashboard');
        this.sidebarService.changeCurrentMenuItem('dashboard');

        // Resolvers Data
        this.identity = this.activatedRoute.snapshot.data['identity'];
        this.config = this.activatedRoute.snapshot.data['config'];
        this.courses = this.activatedRoute.snapshot.data['courses'];
        this.teams = this.activatedRoute.snapshot.data['teams'];
    }

    ngOnDestroy() {
        if (this.dialog_ref instanceof MatDialogRef) this.dialog_ref.close();
    }

    public requestCertificate(course_id: number): void {
        this.profileService.requestCertificate(course_id).subscribe((response: Request_certificate_response) => {
            if (response.success) window.open(response.data);
        })
    }

    public openInviteUserModal() {
        let config: Default_modal_700_width = new Default_modal_700_width();
        this.dialog_entry = this.dialog.open(PeopleCreateModalComponent, config);
    }

    public openCreateTeamModal(){
        
        let config: Default_modal_700_width = new Default_modal_700_width().deserialize({team_id: false});
        this.dialog_entry = this.dialog.open(TeamSettingsModalComponent, config);
    }

    public requestEmailCertificate(course_id: number): void {
        let config: Default_modal_400_width = new Default_modal_400_width().deserialize(course_id);
        this.dialog_ref = this.dialog.open(EmailCertModalComponent, config);
    }
}
