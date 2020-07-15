import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ActivateAccountService} from "./activate-account.service";
import {SystemService} from "../../services/system.service";
import {Activate_account_errors, Activate_account_request, Activate_account_response, Get_activate_account_data} from "./activate-account.model";

@Component({
    templateUrl: './activate-account.component.html'
})

export class ActivateAccountComponent implements OnInit, OnDestroy {

    activate_account: Activate_account_request = new Activate_account_request();

    activate_account_errors: Activate_account_errors = new Activate_account_errors();

    code_editable: Boolean = true;

    routeSubscription: any;

    constructor(private router: Router,
                private activeRoute: ActivatedRoute,
                private systemService: SystemService,
                private authService: AuthService,
                private activateAccountService: ActivateAccountService) {
    }

    ngOnInit() {
        let user = this.authService.getCurrentUser();
        if (user.is_authorised()) {
            this.router.navigate(['/profile/dashboard']);
        }

        this.routeSubscription = this.activeRoute.params.subscribe(params => {
            let code = params['code'];
            if (code) {
                this.code_editable = false;
                this.activate_account.confirm_code = code;

                this.activateAccountService.getActivate(code)
                    .subscribe((response: Get_activate_account_data) => {
                        this.activate_account_errors = response.errors;
                        if (response.success) {
                            this.activate_account = response.data;
                        }
                    })
            }
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    activateAccount() {
        this.activateAccountService.submitActivate(this.activate_account)
            .subscribe((response: Activate_account_response) => {
                this.activate_account_errors = response.errors;

                if (response.success) {
                    window.location.href = '/profile/dashboard';
                }
            })
    }

}