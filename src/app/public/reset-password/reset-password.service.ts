import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Environment} from "../../../environments/environment";
import {Reset_password_request, Reset_password_response} from "./reset-password.model";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {GlobalSpinnerService} from "../../spinner/global/global-spinner.service";

@Injectable()

export class ResetPasswordService {

    private apiUrl: string = '';

    constructor(private http: HttpClient,
                private globalSpinner: GlobalSpinnerService) {
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/reset_password';

    }

    submitReset(request: Reset_password_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl, request)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinner();
                return new Reset_password_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Reset_password_response().deserialize(response.error)];
            });
    }


}