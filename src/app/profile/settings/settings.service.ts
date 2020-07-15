import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
    Get_personal_info_response,
    Personal_info,
    Update_personal_info_response
} from "./personal-information/personal-information.model";
import {Change_password, Change_password_submit_response} from "./change-password/change-password.model";
import {SettingsConfig} from "./settings.model";
import {Account_settings, Account_settings_response} from "./account-settings/account-settings.model";
import {GlobalSpinnerService} from "../../spinner/global/global-spinner.service";
import {Get_certificates_list_response} from "./certificates/certificates.model";
import {
    Acc_key_request, Acc_key_response,
    Get_developers_accs_response
} from "./developers-accounts/developers-accounts.model";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class SettingsService {

    private apiUrl: string = '';

    private menuItemSource = new BehaviorSubject<string>("Personal Information");
    currentMenuItem = this.menuItemSource.asObservable();

    private actualConfig: SettingsConfig = new SettingsConfig();

    constructor(private http: HttpClient,
                private globalSpinner: GlobalSpinnerService) {
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/settings/';
    }

    public changeCurrentMenuItem(item: string) {
        this.menuItemSource.next(item)
    }


    public copy(id:string) {
        var copyText = document.getElementById(id);
        var textArea = document.createElement("textarea");
        textArea.value = copyText.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        this.globalSpinner.hideSpinnerWithFeedback(`${textArea.value} sucefully copied to clipboard`);
        textArea.remove();
        
    }

    public getSettingsChangeUserAvatarUrl(): string {
        return this.apiUrl + 'change_avatar';
    }

    public getSettingsChangeOrgLogoUrl(): string {
        return this.apiUrl + 'change_logo';
    }

    public getSettingsChangeOrgCoverPicUrl(): string {
        return this.apiUrl + 'change_cover_picture';
    }

    public getSettingsActualConfig(): SettingsConfig {
        return this.actualConfig;
    }

    public getSettingsConfig(): Observable<any> {
        return this.http.get(this.apiUrl + 'config', {})
            .map((response: HttpResponse<any>) => {
                this.actualConfig = new SettingsConfig().deserialize(response);
                return this.actualConfig;
            }).catch((error: HttpErrorResponse) => {
                return [error];
            });
    }

    public getAccountSettings(): Observable<Account_settings_response> {
        return this.http.get(this.apiUrl + 'account_settings', {})
            .map((response: HttpResponse<any>) => {
                return new Account_settings_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                return [new Account_settings_response().deserialize(response.error)];
            });
    }

    public getDevelopersAccsSettings(): Observable<Get_developers_accs_response> {
        return this.http.get(this.apiUrl + 'get_developers_accs', {})
            .map((response: HttpResponse<any>) => {
                return new Get_developers_accs_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                return [new Get_developers_accs_response().deserialize(response.error)];
            });
    }

    public addDeveloperAcc(request: Acc_key_request): Observable<Acc_key_response> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'add_developer_acc', request)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Developers Account added!');
                return new Acc_key_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Acc_key_response().deserialize(response.error)];
            });
    }

    public deleteDeveloperAcc(request: Acc_key_request): Observable<Acc_key_response> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'delete_developer_acc', request)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Developers Account deleted!');
                return new Acc_key_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Acc_key_response().deserialize(response.error)];
            });
    }



    public updateAccountSettings(accountSettings: Account_settings): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'account_settings', accountSettings)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Account Settings saved!');
                return new Account_settings_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Account_settings_response().deserialize(response.error)];
            });
    }

    public getPersonalInfo(): Observable<any> {
        return this.http.get(this.apiUrl + 'personal_info', {})
            .map((response: HttpResponse<any>) => {
                return new Get_personal_info_response().deserialize(response);
            }).catch((error: HttpErrorResponse) => {
                return [error];
            });
    }

    public getCertificates(): Observable<any> {
        return this.http.get(this.apiUrl + 'certificates', {})
            .map((response: HttpResponse<any>) => {
                return new Get_certificates_list_response().deserialize(response);
            }).catch((error: HttpErrorResponse) => {
                return [error];
            });
    }

    public updatePersonalInfo(personalInfo: Personal_info): Observable<any> {
        this.globalSpinner.showSpinner();
        var first_name = personalInfo.first_name;
        var last_name = personalInfo.last_name;
        personalInfo.first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1);
        personalInfo.last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1);

        return this.http.post(this.apiUrl + 'personal_info', personalInfo)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Personal Info saved!');
                return new Update_personal_info_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Update_personal_info_response().deserialize(response.error)];
            });
    }

    public updateChangePassword(changePassword: Change_password): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'change_password', changePassword)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Password saved!');
                return new Change_password_submit_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Change_password_submit_response().deserialize(response.error)];
            });
    }

}