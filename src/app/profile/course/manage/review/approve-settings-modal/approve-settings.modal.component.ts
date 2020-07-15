import {Component, Inject, OnInit,} from "@angular/core";
import {Identity} from "../../../../../services/auth.identity.model";
import {AuthService} from "../../../../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {MarketplaceService} from "../../../marketplace.service";
import {
    Get_approve_settings_config, Update_approve_settings_request,
    Update_approve_settings_request_item, Update_approve_settings_response
} from "./approve-settings.model";
import {Marketplace} from "../../../../../shared/Marketplace";
import {Marketplace_status} from "../../../../../shared/Marketplace_status.model";
import {GlobalSpinnerService} from "../../../../../spinner/global/global-spinner.service";


@Component({
    templateUrl: './approve-settings.modal.component.html'
})

export class ApproveSettingsModalComponent implements OnInit {

    identity: Identity;

    config: Array<Marketplace> = [];
    statuses_list: Array<Marketplace_status> = [];

    request: Update_approve_settings_request = new Update_approve_settings_request();

    constructor(private authService: AuthService,
                private marketplaceService: MarketplaceService,
                private spinnerService: GlobalSpinnerService,
                private dialogRef: MatDialogRef<ApproveSettingsModalComponent>,
                @Inject(MAT_DIALOG_DATA) private data: any) {

        this.identity = authService.getCurrentUser();
    }

    ngOnInit() {
        this.marketplaceService.getApproveSettingsConfig(this.data.course_id)
            .subscribe((result: Get_approve_settings_config) => {
                if (result.success) {
                    this.config = result.data.marketplace;
                    this.statuses_list = result.data.statuses;
                    if (this.config.length) {
                        let item: Update_approve_settings_request_item;
                        for (let i in this.config) {
                            item = new Update_approve_settings_request_item();
                            item.id = this.config[i].id;
                            item.marketplace_status_id = this.config[i].status.id;
                            item.review_message = this.config[i].review_message;
                            this.request.marketplace.push(item);
                        }
                    } else {
                        this.spinnerService.feedback('Something went wrong!');
                        this.dialogRef.close();
                    }
                } else {
                    this.spinnerService.feedback('Something went wrong!');
                    this.dialogRef.close();
                }
            });
    }


    saveApproveSettings(): void {
        this.marketplaceService.submitReview(this.request)
            .subscribe((response: Update_approve_settings_response) => {
                if (response.success) {
                    this.spinnerService.feedback('Approval Settings saved!');
                    this.dialogRef.close();
                }
            });
    }

}