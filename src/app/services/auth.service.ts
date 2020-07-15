import {Injectable} from '@angular/core';
import {Environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Identity} from "./auth.identity.model";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Login_request, Login_response} from "../public/login/public-login.model";
import {GlobalSpinnerService} from "../spinner/global/global-spinner.service";
import {Intercom} from "ng-intercom";
import { SignUp_request, Create_Organisation_request, Create_Organisation_response, SignUp_response } from '../public/sign-up/public-signup.model';
import { ProfileSidebarLeftService } from '../profile/sidebar-left/profile-sidebar-left.service';
@Injectable()

export class AuthService {

    public clUser: Identity;
    public apiUrl: string;

    private redirectOnLogin: string = '/profile/dashboard';

    constructor(private http: HttpClient,
                private globalSpinner: GlobalSpinnerService,
                private leftSidebar: ProfileSidebarLeftService,
                private intercom: Intercom) {

        // set token if saved in local storage
        let storage = JSON.parse(localStorage.getItem('clUser'));

        if (storage) {
            this.clUser = new Identity().deserialize(storage);
        } else {
            this.clUser = new Identity();
        }

        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/';
    }

    login(request: Login_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'login', request).map((response: HttpResponse<any>) => {
                let resp = new Login_response().deserialize(response);
                if (resp.success) {
                    this.clUser = resp.data;
                }
                localStorage.setItem('clUser', JSON.stringify(this.clUser));
                this.globalSpinner.hideSpinner();
                return resp;
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Login_response().deserialize(resp.error)];
            });
    }


    checkSignUp(request: SignUp_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'user/before_store', request)
            .map((response: HttpResponse<any>) => {
                let resp = new SignUp_response().deserialize(response);
                this.globalSpinner.hideSpinnerWithFeedback('Good so far...');
                return resp;
            })
            .catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something went wrong. Please contact support.');
                let resp = [new SignUp_response().deserialize(response.error)];
                return resp;
            })
    }


    createOrganisation(request: Create_Organisation_request) : Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'organisation/store',request)
            .map((response: HttpResponse<any>) => {
                let resp = new Create_Organisation_response().deserialize(response);
                this.globalSpinner.hideSpinnerWithFeedback('A confirmation email has been sent to you.');
                return resp;
            })
            .catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something went wrong. Please contact support.');
                return [new Create_Organisation_response().deserialize(response.error)];
            })
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        // this.token = null;
        this.leftSidebar.enableNavigation();
        this.intercom.shutdown();
        this.clUser = new Identity();
        localStorage.removeItem('clUser');
    }

    getCurrentUser(): Identity {
        return this.clUser;
    }

    getCurrentToken(): String {
        return this.clUser.token;
    }

    updateCurrentUser(user: Identity): void {
        this.clUser = user;
        localStorage.removeItem('clUser');
        localStorage.setItem('clUser', JSON.stringify(user));
    }

    setRedirect(path: string) {
        if (this.redirectOnLogin == '/profile/dashboard' && path != '/login') {
            this.redirectOnLogin = path;
        }
    }

    getRedirect(): string {
        return this.redirectOnLogin;
    }

}
