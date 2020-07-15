import {Component, OnDestroy, OnInit,} from "@angular/core";
import {SettingsService} from "../settings.service";
import {Get_certificates_list_response} from "./certificates.model";
import {MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource} from "@angular/material";
import {Certificate} from "../../../shared/Certificate.model";
import {ProfileService} from "../../profile.service";
import {Request_certificate_response} from "../../profile.model";
import {GlobalSpinnerService} from "../../../spinner/global/global-spinner.service";
import {Environment} from "../../../../environments/environment";
import {DatePipe} from "@angular/common";
import {EmailCertModalComponent} from "../../email-cert-modal/email-cert.modal.component";
import { Default_modal_400_width } from "../../../shared/Modal.model";
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './certificates.component.html',
    styleUrls: ['../settings.scss'],
})

export class CertificatesComponent implements OnInit, OnDestroy {

    certs_ds = new MatTableDataSource<Certificate>();
    certs: Array<Certificate> = [];

    pipe: DatePipe = new DatePipe('en-US');

    private dialog_ref: MatDialogRef<EmailCertModalComponent> = null;

    displayedColumns: Array<string> = ['cert_name', 'issued_course_name', 'issued_at',
        'issued_org_name', 'issued_name', 'actions'];


    constructor(
        private settingsService: SettingsService,
        private profileService: ProfileService,
        private activeRoute: ActivatedRoute,
        private spinnerService: GlobalSpinnerService,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.certs = this.activeRoute.snapshot.data['certificates'];
        this.certs_ds = new MatTableDataSource<Certificate>(this.certs);
    }

    ngOnDestroy() {
        if (this.dialog_ref instanceof MatDialogRef) {
            this.dialog_ref.close();
        }
    }

    public renewCertificate(course_id: number) {
        this.profileService.requestCertificate(course_id)
            .subscribe((response: Request_certificate_response) => {
                if (response.success) {
                    this.spinnerService.feedback('Certificate renewed. Updating list...');
                    this.getCertificates();
                } else {
                    this.spinnerService.feedback('Something went wrong. Certificate cannot be renewed!');
                }
            })
    }

    public viewCertificate(cert_name: string) {
        let link = '//' + Environment.certDomain + '/' + cert_name;
        window.open(link);
    }

    public emailCertificate(course_id: number): void {
        let config: Default_modal_400_width = new Default_modal_400_width().deserialize(course_id);
        this.dialog_ref = this.dialog.open(EmailCertModalComponent, config);
    }

    private getCertificates(): void {
        this.settingsService.getCertificates()
            .subscribe((result: Get_certificates_list_response) => {
                if (result.success) {
                    this.certs = result.data;
                    this.certs_ds = new MatTableDataSource<Certificate>(result.data);
                }
            })
    }


}