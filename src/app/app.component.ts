import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { GlobalSpinnerService } from './spinner/global/global-spinner.service';
import { ProfileSidebarLeftService } from './profile/sidebar-left/profile-sidebar-left.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'learnhub-app',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html',
    styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {

    constructor(private router: Router,
                private globalSpinner: GlobalSpinnerService,
                private profileSidebar: ProfileSidebarLeftService) {
    }

    ngOnInit() {
        this.router.events.pipe(filter(event => {
            return event instanceof NavigationStart
                || event instanceof NavigationEnd
                || event instanceof NavigationCancel;
        })).subscribe((event: NavigationStart | NavigationEnd | NavigationCancel) => {
            if (event instanceof NavigationStart) {
                this.profileSidebar.rotateSpinner();
                this.globalSpinner.showSpinner();
            } else if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);
                this.globalSpinner.hideSpinner();
                this.profileSidebar.stopRotateSpinner();
            } else if (event instanceof NavigationCancel) {
                window.scrollTo(0, 0);
                this.globalSpinner.hideSpinner();
                this.profileSidebar.stopRotateSpinner();
            }
        });
    }
}


