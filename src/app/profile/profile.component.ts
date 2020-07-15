import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Intercom} from "ng-intercom";
import {AuthService} from "../services/auth.service";
import {Identity} from "../services/auth.identity.model";
import {IntercomService} from "./intercom.service";
import {Environment} from "../../environments/environment";

@Component({
    styleUrls: ['./profile.scss'],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    private identity: Identity;

    private intercomStateSubscription: any;

    constructor(private authService: AuthService,
                private intercomService: IntercomService,
                private intercom: Intercom) {
        this.identity = this.authService.getCurrentUser();
    }

    ngOnInit() {
        this.intercom.boot({
            app_id: Environment.intercomAppKey,
            user_id: this.identity.user.id.toString(),
            email: this.identity.user.email,
            name: this.identity.user.displayName(),
            // Supports all optional configuration.
            widget: {
                "activator": "#intercom",
            }
        });

        this.intercomStateSubscription = this.intercomService.currentIntercomState.subscribe((state: string) => {
            if (state == 'show') {
                this.intercom.show();
            }
        });

        this.authService.setRedirect('/profile/dashboard');

        this.intercom.onHide = () => {
            this.intercomService.changeIntercomState('hide');
        };
    }

}
