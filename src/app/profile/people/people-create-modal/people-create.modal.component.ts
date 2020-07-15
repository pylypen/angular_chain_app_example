import {Component, Inject, OnInit,} from "@angular/core";
import {Identity} from "../../../services/auth.identity.model";
import {AuthService} from "../../../services/auth.service";
import {MatDialogRef} from "@angular/material";
import {PeopleService} from "../people.service";
import {
    People_create_profile_errors, People_create_profile_request,
    People_create_profile_response
} from "../people.model";

@Component({
    templateUrl: './people-create.modal.component.html'
})

export class PeopleCreateModalComponent implements OnInit {

    identity: Identity;

    request: People_create_profile_request = new People_create_profile_request();
    errors: People_create_profile_errors = new People_create_profile_errors();

    constructor(private authService: AuthService,
                private dialogRef: MatDialogRef<PeopleCreateModalComponent>,
                private peopleService: PeopleService) {
        this.identity = authService.getCurrentUser();
    }

    ngOnInit() {

    }

    createUser() {
        this.peopleService.createUser(this.request)
            .subscribe((resp: People_create_profile_response) => {
                this.errors = resp.errors;
                if (resp.success) {
                    this.dialogRef.close(resp.data);
                }
            })
    }

}