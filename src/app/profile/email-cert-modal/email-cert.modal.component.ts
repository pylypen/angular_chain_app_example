import {Component, Inject, OnInit,} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Email_cert_errors, Email_cert_request, Email_cert_response} from "./email-cert.model";
import {ProfileService} from "../profile.service";

@Component({
    templateUrl: './email-cert.modal.component.html'
})

export class EmailCertModalComponent implements OnInit {

    request: Email_cert_request;
    errors: Email_cert_errors;

    constructor(private dialogRef: MatDialogRef<EmailCertModalComponent>,
                private profileService: ProfileService,
                @Inject(MAT_DIALOG_DATA) private data: number) {
        this.request = new Email_cert_request();
        this.errors = new Email_cert_errors();
    }

    ngOnInit() {
        this.request.course_id = this.data;
    }

    sendEmail(): void {
        this.profileService.requestEmailCertificate(this.request)
            .subscribe((resp: Email_cert_response) => {
                if (resp.success) this.dialogRef.close();
                else this.errors = resp.errors;
            });
    }

}