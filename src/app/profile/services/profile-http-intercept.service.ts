import {Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../services/auth.service'
import {Router} from "@angular/router";


@Injectable()
export class ProfileHttpInterceptService implements HttpInterceptor {
    constructor(private authService: AuthService,
                private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.authService.getCurrentToken();
        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token
            }
        });
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401 || err.status === 403) {
                    this.authService.setRedirect(this.router.url);
                    this.authService.logout();
                    this.router.navigate(['/login']);
                }
            }
        });
    }
}