import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";
import { SignUp_request, Create_Organisation_request, Create_Organisation_response, SignUp_erorrs, SignUp_response, Create_Organisation_errors } from './public-signup.model';
import { MatStepper } from '@angular/material';
import {Environment} from "../../../environments/environment";

@Component({
    templateUrl: './public-signup.component.html'
})

export class PublicSignUpComponent implements OnInit {

    sign_up_request: SignUp_request;
    create_org_request: Create_Organisation_request;
    sign_up_errors: SignUp_erorrs = new SignUp_erorrs();
    create_organisation_errors: Create_Organisation_errors = new Create_Organisation_errors();
    constructor(private authService: AuthService,
                private router: Router) {
        this.sign_up_request = new SignUp_request();
        this.create_org_request = new Create_Organisation_request();
    }

    ngOnInit() {
    }

    @ViewChild('stepper', {static: false}) stepper: MatStepper;


    checkSignUp(request: SignUp_request){
        this.authService.checkSignUp(request)
        .subscribe((result: SignUp_response) => {
            this.sign_up_errors = result.errors;
            if(result.success){
                this.stepper.next();
            }
        });
    }


    createOrganisation(request: any){
        request = {
            ...request,
            ...this.sign_up_request
        }
        this.authService.createOrganisation(request)
        .subscribe((result: Create_Organisation_response) => {
            if(result.errors){
                this.create_organisation_errors = result.errors;
                this.stepper.previous();
            }
            if(result.success){
                window.location.href = '/';
                this.stepper.next();
            }
        });
    }

}
