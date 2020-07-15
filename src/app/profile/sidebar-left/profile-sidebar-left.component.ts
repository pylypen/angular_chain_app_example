import {Component, OnInit} from "@angular/core";
import {ProfileSidebarLeftService} from "./profile-sidebar-left.service";
import { SettingsService } from "../settings/settings.service";
import { SettingsConfig } from "../settings/settings.model";
import { TeamsService } from "../teams/teams.service";
import { Get_teams_response } from "../teams/teams.model";
import { Subscription } from 'rxjs';

@Component({
    selector: 'profile-sidebar-left',
    templateUrl: './profile-sidebar-left.component.html',
    styleUrls: ['./profile-sidebar-left.scss']
})
export class ProfileSidebarLeftComponent implements OnInit {

    sidenav_opened: boolean;
    activeMenuItem: string = 'dashboard';

    responsive: boolean;
    team_admin: boolean;

    disabled_navigation: boolean = false;
    rotate_spinner: boolean = false;
    
    config: SettingsConfig = new SettingsConfig();


    private rotateSubscription: Subscription;

    constructor(private sidebarService: ProfileSidebarLeftService,
                private settingsService: SettingsService,
                private teamService: TeamsService) {
        this.sidenav_opened = false;
        this.responsive = false;
        this.settingsService.getSettingsConfig().subscribe((result: SettingsConfig) => {
            this.config = result;
            this.getTeamsData();
        });
    }

    ngOnInit() {
        this.sidebarService.currentMenuItem.subscribe((menu_item: string) => {
            this.activeMenuItem = menu_item;
        });
        
        this.sidebarService.currentDisableNavigation.subscribe((disability: boolean) => {
            this.disabled_navigation = disability;
        })

        this.rotateSubscription = this.sidebarService.currentrotateLoadingSpinnerDisplay.subscribe((state: boolean) => {
            this.rotate_spinner = state;
        });
        
    }


    toggle() {
        this.sidenav_opened = !this.sidenav_opened;
    }

    responsiveToggle(){
        this.responsive = !this.responsive;
    }

    private getTeamsData(): void {
        this.teamService.getTeamsList().subscribe(
            (result: Get_teams_response) => {

                if (result.success) {
                    result.data.teams = result.data.teams.filter(team => team.is_admin);
                    this.team_admin = Boolean(result.data.teams.length);
                }

            }
        )
    }
}
