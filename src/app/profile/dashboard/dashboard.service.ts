import {Injectable} from "@angular/core";
import {Environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";

@Injectable()

export class DashboardService {

    private apiUrl: string = '';

    constructor(private http: HttpClient,
                private authService: AuthService) {
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/';
    }

}