import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ResetPasswordService} from "./reset-password.service";
import {Reset_password_errors, Reset_password_request, Reset_password_response} from "./reset-password.model";

@Component({
    templateUrl: './reset-password.component.html'
})

export class ResetPasswordComponent implements OnInit, OnDestroy {

    reset_password: Reset_password_request = new Reset_password_request();

    reset_password_errors: Reset_password_errors = new Reset_password_errors();

    token_editable: Boolean = true;

    routeSubscription: any;

    constructor(private router: Router,
                private activeRoute: ActivatedRoute,
                private authService: AuthService,
                private resetPasswordService: ResetPasswordService) {
    }

    ngOnInit() {
        let user = this.authService.getCurrentUser();
        if (user.is_authorised()) {
            this.router.navigate(['/profile/dashboard']);
        }

        this.routeSubscription = this.activeRoute.params.subscribe(params => {
            let token = params['token'];
            if (token) {
                this.token_editable = false;
                this.reset_password.token = token;
            }
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    resetPassword() {
        this.resetPasswordService.submitReset(this.reset_password)
            .subscribe((result: Reset_password_response) => {
                this.reset_password_errors = result.errors;
                if (result.success) {
                    this.router.navigate(['/login']);
                }
            })
    }
}