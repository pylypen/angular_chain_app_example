import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Get_courses_list_response} from "./courses.model";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class CoursesService {

    private apiUrl: string = '';

    constructor(private http: HttpClient) {
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/courses/';
    }

    public getCoursesList(): Observable<any> {
        return this.http.get(this.apiUrl + 'list', {})
            .map((response: HttpResponse<any>) => {
                return new Get_courses_list_response().deserialize(response);
            }).catch((error: HttpErrorResponse) => {
                return [error];
            });
    }
}
