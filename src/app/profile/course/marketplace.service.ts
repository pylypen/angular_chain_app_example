import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";

import {GlobalSpinnerService} from "../../spinner/global/global-spinner.service";
import {
    Request_review_request, Request_review_response,
    Update_course_display_request,
    Update_course_display_response
} from "./edit/publish/course-edit-publish.model";
import {
    Get_approve_settings_config,
    Update_approve_settings_request, Update_approve_settings_response
} from "./manage/review/approve-settings-modal/approve-settings.model";
import {
    Get_assign_config_response, Wildcard_assign_request,
    Assign_response, Personal_assign_request
} from "./manage/assign/course-manage-assign.model";


@Injectable()

export class MarketplaceService {

    private apiUrl: string = '';

    constructor(private http: HttpClient,
                private globalSpinner: GlobalSpinnerService) {
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/marketplace/';
    }

    displayHide(request: Update_course_display_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'show_hide', request)
            .map((response: HttpResponse<any>) => {
                let cred = (request.show) ? 'Published' : 'Hidden';
                this.globalSpinner.hideSpinnerWithFeedback('Course ' + cred + '!');
                return new Update_course_display_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Update_course_display_response().deserialize(response.error)]
            })
    }

    requestReview(request: Request_review_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'request_review', request)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Review Requested!');
                return new Request_review_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Request_review_response().deserialize(response.error)]
            })
    }


    public getCourseDetails(course_id: number): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.get(this.apiUrl + 'details/' + course_id, {})
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinner();
                return resp;
            }).catch((error: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [error];
            });
    }


    getApproveSettingsConfig(course_id: number): Observable<any> {
        return this.http.get(this.apiUrl + 'approval_settings/' + course_id, {})
            .map((resp: HttpResponse<any>) => {
                return new Get_approve_settings_config().deserialize(resp);
            }).catch((response: HttpErrorResponse) => {
                return [new Get_approve_settings_config().deserialize(response.error)];
            });
    }

    getAssignsConfig(course_id: number): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.get(this.apiUrl + 'assigns/' + course_id, {})
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinner();
                return new Get_assign_config_response().deserialize(resp);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Get_assign_config_response().deserialize(response.error)];
            });
    }

    wildcardAssign(request: Wildcard_assign_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'team_assign', request)
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Team Assign Successful!');
                return new Assign_response().deserialize(resp);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Team Assign Failed!');
                return [new Assign_response().deserialize(response.error)];
            });
    }

    personalAssign(request: Personal_assign_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'personal_assign', request)
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Personal Assign Successful!');
                return new Assign_response().deserialize(resp);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Personal Assign Failed!');
                return [new Assign_response().deserialize(response.error)];
            });
    }

    submitReview(request: Update_approve_settings_request): Observable<any> {
        return this.http.post(this.apiUrl + 'submit_review', request)
            .map((resp: HttpResponse<any>) => {
                return new Update_approve_settings_response().deserialize(resp);
            }).catch((response: HttpErrorResponse) => {
                return [new Update_approve_settings_response().deserialize(response.error)];
            });
    }


}