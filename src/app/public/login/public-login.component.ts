import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";
import {Login_errors, Login_request, Login_response} from "./public-login.model";

@Component({
    templateUrl: './public-login.component.html'
})

export class PublicLoginComponent implements OnInit {

    model: Login_request = new Login_request();
    login_errors: Login_errors = new Login_errors();

    constructor(private authService: AuthService,
                private  router: Router) {
    }

    ngOnInit() {
        let user = this.authService.getCurrentUser();
        if (user.is_authorised()) this.router.navigate(['/profile/dashboard']);
    }

    login() {
        this.authService.login(this.model)
            .subscribe((result: Login_response) => {
                this.login_errors = result.errors;
                if (result.success) this.router.navigate([this.authService.getRedirect()]);
            });
    }

}
