import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import {GlobalSpinnerService} from "../../spinner/global/global-spinner.service";
import {Get_statistics_course_response} from "./statistics-courses/statistics-courses.model";


@Injectable()

export class StatisticsService {

    private apiUrl: string = '';

    private statistics_tab_source = new BehaviorSubject<string>('courses');
    public current_statistics_tab = this.statistics_tab_source.asObservable();

    constructor(private http: HttpClient,
                private globalSpinner: GlobalSpinnerService) {
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/statistics/';
    }

    public changeCurrentStatisticsTab(tab: string) {
        this.statistics_tab_source.next(tab);
    }


    public getCSVfile(course_id: number): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.get(`//${Environment.apiDomain}/${Environment.apiVersion}/user/get_csv/${course_id}`, {
            responseType: 'text'
        }).map((res: string) => {
            this.globalSpinner.hideSpinner();
            return res;
        });
    }

    public getStatisticsCourses(): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.get(this.apiUrl + 'courses', {})
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinner();
                return new Get_statistics_course_response().deserialize(resp);
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something went wrong!');
                return [new Get_statistics_course_response().deserialize(resp.error)];
            });
    }

}