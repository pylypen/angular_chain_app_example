import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Get_teams_response} from "./teams.model";
import {isNumber} from "util";
import {
    Get_team_settings_config_response, Renew_team_settings_response,
    Update_team_settings_response
} from "./team-settings-modal/team-settings.model";
import {Get_team_members_config_response, Update_team_members_response} from "./team-members-modal/team-members.model";
import {GlobalSpinnerService} from "../../spinner/global/global-spinner.service";
import { Media_file } from 'src/app/shared/Media_file.model';

@Injectable()

export class TeamsService {

    private apiUrl: string = '';

    constructor(private http: HttpClient,
                private globalSpinner: GlobalSpinnerService) {
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/teams/';
    }

    getUploadUrl(): string {
        return this.apiUrl + 'update_logo/';
    }

    public getTeamsList(): Observable<any> {
        return this.http.get(this.apiUrl + 'list', {})
            .map((response: HttpResponse<any>) => {
                return new Get_teams_response().deserialize(response);
            }).catch((error: HttpErrorResponse) => {
                return [error];
            });
    }

    public getTeamSettingsConfig(team_id: number | boolean): Observable<any> {
        let request_parameter = (team_id && isNumber(team_id)) ? '/' + team_id : '';

        return this.http.get(this.apiUrl + 'settings_config' + request_parameter, {})
            .map((response: HttpResponse<any>) => {
                return new Get_team_settings_config_response().deserialize(response);
            }).catch((error: HttpErrorResponse) => {
                return [error];
            });
    }

    public getTeamMembersConfig(team_id: number): Observable<any> {
        return this.http.get(this.apiUrl + 'members_config/' + team_id, {})
            .map((response: HttpResponse<any>) => {
                return new Get_team_members_config_response().deserialize(response);
            }).catch((error: HttpErrorResponse) => {
                return [error];
            });
    }

    //todo: implement request and validation
    public saveTeamSettings(team_id: number | boolean, admins: Array<string>, team_name: string, logo: Media_file): Observable<any> {
        let request_parameter = (team_id && isNumber(team_id)) ? '/' + team_id : '';
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'update' + request_parameter, {
            admins: admins,
            team_name: team_name,
            logo: logo
        }).map((response: HttpResponse<any>) => {
            this.globalSpinner.hideSpinnerWithFeedback('Team saved!');
            return new Update_team_settings_response().deserialize(response);
        }).catch((error: HttpErrorResponse) => {
            this.globalSpinner.hideSpinner();
            return [error];
        });
    }

    // todo: implement validation errors
    public saveTeamMembers(team_id: number, members: Array<string>): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'update_members/' + team_id, {
            members: members
        }).map((response: HttpResponse<any>) => {
            this.globalSpinner.hideSpinnerWithFeedback('Team saved!');
            return new Update_team_members_response().deserialize(response);
        }).catch((error: HttpErrorResponse) => {
            this.globalSpinner.hideSpinner();
            return [error];
        });
    }

}