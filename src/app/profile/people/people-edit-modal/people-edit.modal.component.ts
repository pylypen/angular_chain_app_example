import {Component, Inject, OnInit,} from "@angular/core";
import {Identity} from "../../../services/auth.identity.model";
import {AuthService} from "../../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {User} from "../../../shared/User.model";
import {
    People_update_profile_errors, People_update_profile_request,
    People_update_profile_response
} from "../people.model";
import {PeopleService} from "../people.service";

@Component({
    templateUrl: './people-edit.modal.component.html'
})

export class PeopleEditModalComponent implements OnInit {

    identity: Identity;

    request: People_update_profile_request = new People_update_profile_request();
    errors: People_update_profile_errors = new People_update_profile_errors();

    constructor(private authService: AuthService,
                private dialogRef: MatDialogRef<PeopleEditModalComponent>,
                private peopleService: PeopleService,
                @Inject(MAT_DIALOG_DATA) public user: User) {
        this.identity = authService.getCurrentUser();
    }

    ngOnInit() {
        this.request = new People_update_profile_request().deserialize(this.user);
    }

    updateUser() {
        this.peopleService.updateUser(this.user.id, this.request)
            .subscribe((resp: People_update_profile_response) => {
                this.errors = resp.errors;
                if (resp.success) {
                    this.dialogRef.close(resp.data);
                }
            });
    }

}