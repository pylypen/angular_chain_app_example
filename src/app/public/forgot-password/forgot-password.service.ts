import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Forgot_password_request, Forgot_password_response, Get_question_response} from "./forgot-password.model";
import {GlobalSpinnerService} from "../../spinner/global/global-spinner.service";

@Injectable()

export class ForgotPasswordService {

    private apiUrl: string = '';

    constructor(private http: HttpClient,
                private globalSpinner: GlobalSpinnerService) {
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/forgot_password';

    }

    submitAnswer(request: Forgot_password_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl, request)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinner();
                return new Forgot_password_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Forgot_password_response().deserialize(response.error)];
            });
    }

}
