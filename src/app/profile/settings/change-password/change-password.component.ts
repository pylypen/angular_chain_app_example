import {Component, OnInit,} from "@angular/core";
import {SettingsService} from "../settings.service";
import {Change_password, Change_password_errors} from "./change-password.model";

@Component({
    templateUrl: './change-password.component.html',
    styleUrls: ['../settings.scss'],
})

export class ChangePasswordComponent implements OnInit {

    change_password: Change_password = new Change_password();
    errors: Change_password_errors = new Change_password_errors();

    constructor(private settingsService: SettingsService) {
    }

    ngOnInit() {
    }

    public submit_password_change() {
        this.settingsService.updateChangePassword(this.change_password)
            .subscribe(result => {
                this.errors = result.errors;
                if (result.success) {
                    this.errors = new Change_password_errors();
                    this.change_password = new Change_password();
                    //todo: do anything if it's required
                }
            });
    }

}