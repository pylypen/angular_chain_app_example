import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";

import {
    Get_people_list_response, People_create_profile_request, People_create_profile_response, People_reinvite_response,
    People_update_profile_request,
    People_update_profile_response
} from "./people.model";
import {GlobalSpinnerService} from "../../spinner/global/global-spinner.service";

@Injectable()

export class PeopleService {

    private apiUrl: string = '';

    constructor(private http: HttpClient,
                private globalSpinner: GlobalSpinnerService) {
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/people/';
    }

    public getPeopleList(): Observable<any> {
        return this.http.get(this.apiUrl + 'list', {})
            .map((resp: HttpResponse<any>) => {
                return new Get_people_list_response().deserialize(resp);
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something went wrong!');
                return [new Get_people_list_response().deserialize(resp.error)];
            });
    }

    public toggleAdmin(user_id: number, is_admin: boolean): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'toggle_admin/' + user_id, {is_admin: is_admin})
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Admin status updated!');
                return new Get_people_list_response().deserialize(resp);
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something went wrong!');
                return [new Get_people_list_response().deserialize(resp.error)];
            });
    }

    public updateUser(user_id: number, request: People_update_profile_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'updateUser/' + user_id, request)
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('User Updated!');
                return new People_update_profile_response().deserialize(resp);
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something went wrong!');
                return [new People_update_profile_response().deserialize(resp.error)];
            });
    }

    public deleteUser(user_id: number): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.delete(this.apiUrl + 'deleteUser/' + user_id, {})
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('User Deleted!');
                return new Get_people_list_response().deserialize(resp);
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something went wrong!');
                return [new Get_people_list_response().deserialize(resp.error)];
            });
    }

    public createUser(request: People_create_profile_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'createUser', request)
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('User Created!');
                return new People_create_profile_response().deserialize(resp);
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something went wrong!');
                return [new People_create_profile_response().deserialize(resp.error)];
            });
    }

    public reinviteUser(id: number): Observable<People_reinvite_response> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'reinvite/' + id, {})
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Invite email re-sent!');
                return new People_reinvite_response().deserialize(resp);
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something went wrong!');
                return [new People_reinvite_response().deserialize(resp.error)];
            });
    }


}
