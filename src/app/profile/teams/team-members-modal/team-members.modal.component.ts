import {Component, Inject, OnInit, ElementRef, OnDestroy, ViewChild} from "@angular/core";
import {Identity} from "../../../services/auth.identity.model";
import {
    Get_team_members_config_response, Team_members_config,
    Update_team_members_response
} from "./team-members.model";
import {AuthService} from "../../../services/auth.service";
import {TeamsService} from "../teams.service";
import {MAT_DIALOG_DATA, MatDialogRef, MatAutocompleteSelectedEvent, MatChipInputEvent} from "@angular/material";
import {User} from "../../../shared/User.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";

@Component({
    templateUrl: './team-members.modal.component.html'
})

export class TeamMembersModalComponent implements OnInit, OnDestroy {

    identity: Identity;
    config: Team_members_config = new Team_members_config();
    separatorKeysCodes = [ENTER, COMMA];
    memberCtrl = new FormControl();
    memberEmails: Array<string> = [];
    filteredUsers: User[];
    searchSubscription: Subscription;

    @ViewChild('emailInput', {static: false}) emailInput: ElementRef;

    constructor(private authService: AuthService,
                private teamService: TeamsService,
                private dialogRef: MatDialogRef<TeamMembersModalComponent>,
                @Inject(MAT_DIALOG_DATA) private data: any) {
        this.identity = authService.getCurrentUser();

        this.searchSubscription = this.memberCtrl.valueChanges.subscribe((email: string | null) => {
            if (email && email.length) {
                let filtered = this.filter(email);
                if (filtered.length) {
                    this.filteredUsers = filtered;
                } else {
                    this.filteredUsers = this.config.users;
                }
            } else {
                this.filteredUsers = this.config.users;
            }
        });
    }

    ngOnInit() {
        this.teamService.getTeamMembersConfig(this.data.team_id)
            .subscribe((response: Get_team_members_config_response) => {
                if (response.success) {
                    this.config = response.data;
                    this.config.members.map((user: User) => {
                        this.memberEmails.push(user.email);
                    });
                }
            });
    }

    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            if (this.memberEmails.indexOf(value.toLowerCase()) < 0) {
                this.memberEmails.push(value.toLowerCase());
            }
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.memberCtrl.setValue(null);
    }

    remove(email: any): void {
        const index = this.memberEmails.indexOf(email);
        if (index >= 0) {
            this.memberEmails.splice(index, 1);
        }
    }

    filter(name: string) {
        return this.config.users.filter(user =>
            (
                user.email.toLowerCase().indexOf(name.toLowerCase()) >= 0
                ||
                user.displayName().toLowerCase().indexOf(name.toLowerCase()) >= 0
            )
        );
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        if (this.memberEmails.indexOf(event.option.value) < 0) {
            this.memberEmails.push(event.option.value);
        }
        this.emailInput.nativeElement.value = '';
        this.memberCtrl.setValue(null);
    }

    saveTeam() {
        this.teamService.saveTeamMembers(this.config.team.id, this.memberEmails)
            .subscribe((response: Update_team_members_response) => {
                if (response.success) {
                    this.dialogRef.close();
                } else {
                    //todo: error display
                }
            });

    }
}