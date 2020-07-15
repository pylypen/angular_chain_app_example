import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {MatSnackBar} from "@angular/material";
import { ProfileSidebarLeftService } from 'src/app/profile/sidebar-left/profile-sidebar-left.service';

@Injectable()

export class GlobalSpinnerService {


    private globalSpinnerDisplaySource = new BehaviorSubject<boolean>(false);
    public currentGlobalSpinnerDisplay = this.globalSpinnerDisplaySource.asObservable();

    constructor(private snackBar: MatSnackBar, private leftSidebar: ProfileSidebarLeftService) {
    }

    showSpinner() {
        this.globalSpinnerDisplaySource.next(true);
        this.leftSidebar.rotateSpinner();
    }

    hideSpinner() {
        this.leftSidebar.stopRotateSpinner();
        this.globalSpinnerDisplaySource.next(false);
    }

    hideSpinnerWithFeedback(message: string, action_label?: string) {
        this.hideSpinner();
        this.leftSidebar.stopRotateSpinner();
        this.feedback(message, action_label);
    }

    feedback(message: string, action_label?: string) {
        this.snackBar.open(message, action_label, {
            duration: 3500,
            verticalPosition: 'top',
            horizontalPosition: 'end'
        });
    }


}