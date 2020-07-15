import {Component, OnDestroy, OnInit} from "@angular/core";
import {CourseService} from "../../course.service";
import {Course} from "../../../../shared/Course.model";
import {Identity} from "../../../../services/auth.identity.model";
import {MatDialog, MatDialogRef, MatTableDataSource} from "@angular/material";
import {Lesson} from "../../../../shared/Lesson.model";
import {Request_certificate_response} from "../../../profile.model";
import {ProfileService} from "../../../profile.service";
import {EmailCertModalComponent} from "../../../email-cert-modal/email-cert.modal.component";
import {Subject} from "rxjs";
import {Default_modal_400_width} from "../../../../shared/Modal.model";
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from "rxjs/operators";
import {AuthService} from "../../../../services/auth.service";

@Component({
    templateUrl: './course-view-list.component.html'
})

export class CourseViewListComponent implements OnInit, OnDestroy {

    identity: Identity; // Identity user object
    course: Course; // Current course object

    displayedColumns: Array<string> = ['order', 'name', 'progress', 'actionLabel'];

    dataSource = new MatTableDataSource<Lesson>([]);

    private dialog_ref: MatDialogRef<EmailCertModalComponent> = null;
    private subscriptions = new Subject();

    constructor(
        private courseService: CourseService,
        private dialog: MatDialog,
        private activeRoute: ActivatedRoute,
        private profileService: ProfileService,
        private authService: AuthService) {
        this.identity = this.authService.getCurrentUser();
    }

    ngOnInit() { // Get current working course and lessons from this course

        this.courseService.current_working_course
            .pipe(takeUntil(this.subscriptions))
            .subscribe((course: Course) => {
                this.course = course;
                this.dataSource = new MatTableDataSource<Lesson>(this.course.lessons);
            });

    }

    ngOnDestroy() { // Unsubscribe all subscriptions and close all dialogs
        this.subscriptions.next();
        this.subscriptions.complete();

        if (this.dialog_ref instanceof MatDialogRef) {
            this.dialog_ref.close();
        }
    }

    public requestCertificate(course_id: number): void { // Request Certificate in PDF file in new window
        this.profileService.requestCertificate(course_id)
            .pipe(takeUntil(this.subscriptions))
            .subscribe((response: Request_certificate_response) => {
                if (response.success) {
                    window.open(response.data);
                }
            })
    }

    public requestEmailCertificate(course_id: number): void { // Create request EmailCertificate modal window
        let config: Default_modal_400_width = new Default_modal_400_width().deserialize(course_id);
        this.dialog_ref = this.dialog.open(EmailCertModalComponent, config);
    }
}
