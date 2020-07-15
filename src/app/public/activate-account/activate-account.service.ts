import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Environment} from "../../../environments/environment";
import {Activate_account_request, Activate_account_response, Get_activate_account_data} from "./activate-account.model";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {GlobalSpinnerService} from "../../spinner/global/global-spinner.service";
import {Identity} from "../../services/auth.identity.model";

@Injectable()

export class ActivateAccountService {

    public clUser: Identity;
    private apiUrl: string = '';

    private result = {
        success: false,
        errors: {
            confirm_code: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            password_confirmation: ''
        }
    };

    constructor(private http: HttpClient,
                private globalSpinner: GlobalSpinnerService) {
        // set token if saved in local storage
        let storage = JSON.parse(localStorage.getItem('clUser'));

        if (storage) {
            this.clUser = new Identity().deserialize(storage);
        } else {
            this.clUser = new Identity();
        }
        
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/';

    }

    submitActivate(request: Activate_account_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'confirm_code', request)
            .map((response: HttpResponse<any>) => {
                let resp = new Activate_account_response().deserialize(response);
                
                if (resp.success) {
                    this.clUser = resp.data;
                }
                
                localStorage.setItem('clUser', JSON.stringify(this.clUser));
                this.globalSpinner.hideSpinner();
                return new Activate_account_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Activate_account_response().deserialize(response.error)];
            });
    }

    getActivate(confirm_code: string): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.get(this.apiUrl + 'confirm_code/' + confirm_code)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinner();
                return new Get_activate_account_data().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Get_activate_account_data().deserialize(response.error)];
            });
    }

}