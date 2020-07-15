import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()

export class ProfileSidebarLeftService {


    private menuItemSource = new BehaviorSubject<string>("dashboard");
    currentMenuItem = this.menuItemSource.asObservable();

    private disableNavigationSource = new BehaviorSubject<boolean>(false);
    currentDisableNavigation = this.disableNavigationSource.asObservable();

    private rotateLoadingSpinnerSource = new BehaviorSubject<boolean>(false);
    public currentrotateLoadingSpinnerDisplay = this.rotateLoadingSpinnerSource.asObservable();



    constructor() {
    }

    changeCurrentMenuItem(item: string) {
        this.menuItemSource.next(item)
    }

    disableNavigation() {
        this.disableNavigationSource.next(true);
    }

    enableNavigation() {
        this.disableNavigationSource.next(false);
    }

    rotateSpinner() {
        this.rotateLoadingSpinnerSource.next(true);
    }

    stopRotateSpinner() {
        this.rotateLoadingSpinnerSource.next(false);
    }



}