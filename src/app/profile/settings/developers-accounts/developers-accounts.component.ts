import {Component, OnInit,} from "@angular/core";
import {SettingsService} from "../settings.service";
import {GlobalSpinnerService} from "../../../spinner/global/global-spinner.service";
import {Developer_account} from "../../../shared/Developer_account.model";
import {MatTableDataSource} from "@angular/material";
import {DatePipe} from "@angular/common";
import {Acc_key_errors, Acc_key_request, Acc_key_response, Get_developers_accs_response} from "./developers-accounts.model";
import { ActivatedRoute } from '@angular/router';
@Component({
    templateUrl: './developers-accounts.component.html',
    styleUrls: ['../settings.scss'],
})

export class DevelopersAccountsComponent implements OnInit {

    accs_ds = new MatTableDataSource<Developer_account>();
    accs: Array<Developer_account> = [];

    add_acc_request: Acc_key_request = new Acc_key_request();
    add_acc_errors: Acc_key_errors = new Acc_key_errors();

    pipe: DatePipe = new DatePipe('en-US');

    displayedColumns: Array<string> = ['issued_to', 'email', 'account_key',
        'access_used', 'actions'];

    constructor(
        private settingsService: SettingsService,
        private activeRoute: ActivatedRoute,        
        private spinnerService: GlobalSpinnerService,) {
    }

    ngOnInit() {
        this.accs = this.activeRoute.snapshot.data['dev_accs'];
        this.accs_ds = new MatTableDataSource<Developer_account>(this.accs);
    }

    copy(element: any){
        this.settingsService.copy(element);
    }


    addAccount(): void {
        this.settingsService.addDeveloperAcc(this.add_acc_request)
            .subscribe((resp: Acc_key_response) => {
                this.add_acc_errors = resp.errors;
                if (resp.success) {
                    this.add_acc_request = new Acc_key_request();
                    this.getAccounts();
                }
            });
    }

    deleteAccount(key: string): void {
        let req: Acc_key_request = new Acc_key_request();
        req.acc_key = key;
        this.settingsService.deleteDeveloperAcc(req)
            .subscribe((resp: Acc_key_response) => {
                if (resp.success) {
                    this.getAccounts();
                } else {
                    this.spinnerService.feedback(resp.errors.acc_key.message);
                }
            });
    }


    private getAccounts(): void {
        this.settingsService.getDevelopersAccsSettings()
            .subscribe((result: Get_developers_accs_response) => {
                if (result.success) {
                    this.accs = result.data;
                    this.accs_ds = new MatTableDataSource<Developer_account>(result.data);
                }
            })
    }


}