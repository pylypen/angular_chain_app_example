import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Get_secret_questions_response} from "./system.model";

@Injectable()

export class SystemService {

    public apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/system/';
    }

    getSecretQuestions(): Observable<any> {

        return this.http.get(this.apiUrl + 'secret_questions')
            .map((response: HttpResponse<any>) => {
                return new Get_secret_questions_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                return [new Get_secret_questions_response().deserialize(response)];
            });
    }

   


}