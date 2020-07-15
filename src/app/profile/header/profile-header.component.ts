import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ProfileHeaderService} from "./profile-header.service";
import {Title} from "@angular/platform-browser";
import {Identity} from "../../services/auth.identity.model";
import {IntercomService} from "../intercom.service";
import * as moment from 'moment';
@Component({
    selector: 'profile-header',
    templateUrl: './profile-header.component.html',
    styleUrls: ['./profile-header.scss']
})
export class ProfileHeaderComponent implements OnInit {

    page_title: string;
    title_prefix: string = 'LearnHub';
    disabled_navigation: boolean = false;
    subscription: any;
    identity: Identity = new Identity();

    constructor(
      private authService: AuthService,
      private intercomService: IntercomService,
      private router: Router,
      private headerService: ProfileHeaderService,
      private titleService: Title) {
    }


    ngOnInit() {
        this.headerService.currentPageTitle.subscribe((title: string) => {
            this.page_title = title;
            this.titleService.setTitle(this.title_prefix + ' - ' + title);
        });
        this.headerService.currentDisableNavigation.subscribe((disability: boolean) => {
            this.disabled_navigation = disability;
        });

        this.identity = this.authService.getCurrentUser();
    }

    daysDifference(trian_ends: Date | string){
        var start = moment(trian_ends);
        var end = moment();
        return Math.floor(moment.duration(start.diff(end)).asDays());
    }




    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    openIntercom() {
        this.intercomService.changeIntercomState('show');
    }

}
