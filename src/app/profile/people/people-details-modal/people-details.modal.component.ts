import {Component, Inject, OnInit,} from "@angular/core";
import {Identity} from "../../../services/auth.identity.model";
import {AuthService} from "../../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {User} from "../../../shared/User.model";
import {PeopleService} from "../people.service";
import { CoursesService } from "../../courses/courses.service";
import { Get_courses_snapshot_response } from "../../courses/courses.model";
import { ProfileService } from "../../profile.service";
import { Request_certificate_response } from "../../profile.model";
import { Course } from "../../../shared/Course.model";

@Component({
    templateUrl: './people-details.modal.component.html',
    styleUrls: ['./people-details.modal.scss']
})

export class PeopleDetailsModalComponent implements OnInit {

    identity: Identity;
    courses: Array<Course> = [];
    constructor(private authService: AuthService,
                private profileService: ProfileService,
                private coursesService: CoursesService,
                private dialogRef: MatDialogRef<PeopleDetailsModalComponent>,
                private peopleService: PeopleService,
                @Inject(MAT_DIALOG_DATA) public user: User) {
        this.identity = authService.getCurrentUser();
        this.profileService.getCoursesById(this.user.id)
        .subscribe((response: Get_courses_snapshot_response) => {
            if (response.success) {
                this.courses = response.data;
            }
        });
    }

    ngOnInit() {
 
    }

    public requestCertificate(course_id: number, user_id: number): void {
        this.profileService.requestCertificate(course_id, user_id)
            .subscribe((response: Request_certificate_response) => {
                if (response.success) {
                    window.open(response.data);
                }
            })
    }
}