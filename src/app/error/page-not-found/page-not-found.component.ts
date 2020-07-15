import {Component} from "@angular/core";
import { ProfileHeaderService } from "../../profile/header/profile-header.service";

@Component({
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.scss']
})
export class PageNotFoundComponent {

    constructor(private headerService: ProfileHeaderService ){}

    ngOnInit() {
        this.headerService.changeTitle('Error 404');
    }

    
}

