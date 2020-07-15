import {Component, OnInit, Input} from "@angular/core";
import {ProfileHeaderService} from "../header/profile-header.service";
import {ProfileSidebarLeftService} from "../sidebar-left/profile-sidebar-left.service";
import {Identity} from "../../services/auth.identity.model";
import {SettingsConfig} from "./settings.model";
import {SettingsService} from "./settings.service";
import { TeamsList} from "../teams/teams.model";
import {trigger, state, style, animate, transition} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.scss'],
    animations: [
        trigger('responsiveMenu', [
            state('false', style({})),
            state('true', style({
                height: '37rem'
            })),
            transition('*=>false', animate('300ms')),
            transition('*=>true', animate('500ms'))
        ])
    ]
})
export class SettingsComponent implements OnInit {

    teams: TeamsList = new TeamsList();
    identity: Identity = new Identity();
    config: SettingsConfig = new SettingsConfig();

    currentPage: string = '';

    constructor(
        private headerService: ProfileHeaderService,
        private sidebarService: ProfileSidebarLeftService,
        private activeRoute: ActivatedRoute,
        private settingsService: SettingsService) {
    }

    @Input() currentState: boolean = false;

    ngOnInit() {
        this.headerService.changeTitle('Settings');
        this.sidebarService.changeCurrentMenuItem('settings');

        this.identity = this.activeRoute.snapshot.data['identity'];
        this.config = this.activeRoute.snapshot.data['config'];
        this.teams = this.activeRoute.snapshot.data['teams'];

        this.settingsService.currentMenuItem.subscribe((menu_item)=>{
            this.currentPage = menu_item;
        })
    }

    toggleMenu() {
        this.currentState = !this.currentState;
    }

    changeCurrentMenuItem(item: string) {
        this.settingsService.changeCurrentMenuItem(item);
    }

}
