import {Injectable} from "@angular/core";
import {Environment} from "../../environments/environment";
import {AuthService} from "../services/auth.service";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {GlobalSpinnerService} from "../spinner/global/global-spinner.service";
import {Request_certificate_response} from "./profile.model";
import {Email_cert_request, Email_cert_response} from "./email-cert-modal/email-cert.model";;
import { Get_courses_snapshot_response } from "./courses/courses.model";


@Injectable()

export class ProfileService {

    private apiUrl: string = '';

    constructor(private http: HttpClient,
                private authService: AuthService,
                private globalSpinner: GlobalSpinnerService) {
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/';
    }


   


    public requestCertificate(course_id: number, user_id: number = this.authService.getCurrentUser().user.id): Observable<Request_certificate_response> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'certificates/request', {
            course_id: course_id,
            user_id: user_id
        })
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinner();
                return new Request_certificate_response().deserialize(response);
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something went wrong during certificate generation attempt');
                return [new Request_certificate_response().deserialize(resp.error)];
            })
    }

    
    public getCoursesById(user_id: number): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.get(this.apiUrl + 'user/courses_snapshot/' + user_id)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinner();
                return new Get_courses_snapshot_response().deserialize(response);
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Get_courses_snapshot_response().deserialize(resp.error)];
            })
    }

    public requestEmailCertificate(request: Email_cert_request): Observable<Email_cert_response> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'certificates/email_request', request)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Certificate has been sent to email');
                return new Email_cert_response().deserialize(response);
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something went wrong during emailing attempt');
                return [new Email_cert_response().deserialize(resp.error)];
            })
    }

}