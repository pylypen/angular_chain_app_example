import {Component, Inject, OnInit, ElementRef, OnDestroy, ViewChild} from "@angular/core";
import {
    Get_team_settings_config_response, Renew_team_settings_response, Team_settings_config,
    Update_team_settings_response
} from "./team-settings.model";
import {Identity} from "../../../services/auth.identity.model";
import {TeamsService} from "../teams.service";
import {AuthService} from "../../../services/auth.service";
import {MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef} from "@angular/material";
import {User} from "../../../shared/User.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import { GlobalSpinnerService } from "../../../spinner/global/global-spinner.service";
import { ImageCropModalService } from '../../settings/image-crop-modal/image-crop.modal.service';
import { ImageCropped } from 'src/app/shared/Image_cropper_default.model';

@Component({
    templateUrl: './team-settings.modal.component.html'
})

export class TeamSettingsModalComponent implements OnInit, OnDestroy {

    config: Team_settings_config = new Team_settings_config();
    identity: Identity;

    separatorKeysCodes = [ENTER, COMMA];
    memberCtrl = new FormControl();
    memberEmails: Array<string> = [];
    filteredUsers: User[];

    private searchSubscription: Subscription;
    private avatar_subscription: Subscription;

    @ViewChild('emailInput', {static: false}) emailInput: ElementRef;

    constructor(private teamsService: TeamsService,
                private authService: AuthService,
                private imageCropService: ImageCropModalService,
                private spinnerService: GlobalSpinnerService,
                private dialogRef: MatDialogRef<TeamSettingsModalComponent>,
                @Inject(MAT_DIALOG_DATA) private data: any) {

        this.identity = this.authService.getCurrentUser();

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
        this.teamsService.getTeamSettingsConfig(this.data.team_id)
            .subscribe((result: Get_team_settings_config_response) => {
            if (result.success) {
                this.config = result.data;
                this.config.admins.map((user: User) => {
                    this.memberEmails.push(user.email);
                });
            }
        });
        this.avatar_subscription = this.imageCropService.avatar_changed.subscribe((res: ImageCropped) => {
            if(res && this.config.team.logo) this.config.team.logo.src = res.base64;
        })
    }

    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
        this.imageCropService.cropperDisable();
        this.avatar_subscription.unsubscribe();
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

    fileChangeEvent(event: any, type: string): void {
        if(event.target.value) this.imageCropService.openImageCropModal(event, type);
    }

    saveTeam() {
        let team_name: string = this.config.team.name;

        this.teamsService.saveTeamSettings(this.data.team_id, this.memberEmails, team_name, this.config.team.logo)
        .subscribe((result: Update_team_settings_response) => {
            if (result.success) {
                this.dialogRef.close();
            } else this.spinnerService.hideSpinnerWithFeedback('Invalid email addres or something goes wrong');
        });
    }

}
