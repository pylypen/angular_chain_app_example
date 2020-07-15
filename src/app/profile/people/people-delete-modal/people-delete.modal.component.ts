import {Component, Inject, OnInit,} from "@angular/core";
import {Identity} from "../../../services/auth.identity.model";
import {AuthService} from "../../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {User} from "../../../shared/User.model";
import {Get_people_list_response} from "../people.model";
import {PeopleService} from "../people.service";

@Component({
    templateUrl: './people-delete.modal.component.html'
})

export class PeopleDeleteModalComponent implements OnInit {

    identity: Identity;

    constructor(private authService: AuthService,
                private dialogRef: MatDialogRef<PeopleDeleteModalComponent>,
                private peopleService: PeopleService,
                @Inject(MAT_DIALOG_DATA) public user: User) {
        this.identity = authService.getCurrentUser();
    }

    ngOnInit() {

    }

    confirmDelete() {
        this.peopleService.deleteUser(this.user.id)
            .subscribe((resp: Get_people_list_response) => {
                if (resp.success) {
                    this.dialogRef.close(resp.data);
                }
            });
    }

}