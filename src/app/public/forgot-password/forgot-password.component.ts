import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ForgotPasswordService} from "./forgot-password.service";
import {
    Forgot_password_errors,
    Forgot_password_request, Forgot_password_response,
    Get_question_errors,
    Get_question_response
} from "./forgot-password.model";
import {Secret_question} from "../../shared/Secret_question";

@Component({
    templateUrl: './forgot-password.component.html'
})

export class ForgotPasswordComponent implements OnInit {

    forgot_password: Forgot_password_request = new Forgot_password_request();
    question: Secret_question = new Secret_question();

    forgot_password_errors: Forgot_password_errors = new Forgot_password_errors();
    get_question_errors: Get_question_errors = new Get_question_errors();

    form_step: string;

    constructor(private router: Router,
                private authService: AuthService,
                private forgotPasswordService: ForgotPasswordService) {
        this.form_step = 'reset'
    }

    ngOnInit() {
        let user = this.authService.getCurrentUser();
        if (user.is_authorised()) {
            this.router.navigate(['/profile/dashboard']);
        }
    }

    submitAnswer() {
        this.forgotPasswordService.submitAnswer(this.forgot_password)
            .subscribe((result: Forgot_password_response) => {
                this.forgot_password_errors = result.errors;
                if (result.success) {
                    this.form_step = 'email_sent';
                }
            });

    }

}