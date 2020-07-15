import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()

export class ProfileHeaderService {


    private pageTitleSource = new BehaviorSubject<string>("Page Title");
    currentPageTitle = this.pageTitleSource.asObservable();

    private disableNavigationSource = new BehaviorSubject<boolean>(false);
    currentDisableNavigation = this.disableNavigationSource.asObservable();

    constructor() {
    }

    changeTitle(title: string) {
        this.pageTitleSource.next(title)
    }

    disableNavigation() {
        this.disableNavigationSource.next(true);
    }

    enableNavigation() {
        this.disableNavigationSource.next(false);
    }

}