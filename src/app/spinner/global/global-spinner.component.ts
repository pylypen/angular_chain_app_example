import {Component, OnDestroy, OnInit} from "@angular/core";
import {GlobalSpinnerService} from "./global-spinner.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'spinner-global',
    styleUrls: ['./global-spinner.scss'],
    templateUrl: './global-spinner.component.html',
})
export class GlobalSpinnerComponent implements OnInit, OnDestroy {

    display_spinner: boolean;

    private global_spinner_subscription: Subscription;

    constructor(
        private globalSpinnerService: GlobalSpinnerService) {
        this.display_spinner = false;
    }

    ngOnInit() {
        this.global_spinner_subscription = this.globalSpinnerService.currentGlobalSpinnerDisplay
            .subscribe((state: boolean) => {
                this.display_spinner = state;
            });
    }

    ngOnDestroy() {
        this.global_spinner_subscription.unsubscribe();
    }

}