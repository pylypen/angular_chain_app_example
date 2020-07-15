import {Component, OnDestroy, OnInit, Input} from "@angular/core";
import {ProfileHeaderService} from "../header/profile-header.service";
import {ProfileSidebarLeftService} from "../sidebar-left/profile-sidebar-left.service";
import {Identity} from "../../services/auth.identity.model";
import {TeamsList} from "../teams/teams.model";
import {StatisticsService} from "./statistics.service";
import {Subscription} from "rxjs/Subscription";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './statistics.component.html',
    animations: [
        trigger('responsiveMenu', [
          state('false', style({
          })),
          state('true', style({
              height: '10rem'
          })),
          transition('*=>false', animate('300ms')),
          transition('*=>true', animate('500ms'))
        ])
      ]
})
export class StatisticsComponent implements OnInit, OnDestroy {

    teams: TeamsList = new TeamsList();
    identity: Identity = new Identity();

    active_tab: string;

    private tabSubscription: Subscription;
    @Input() currentState: boolean = false;
    constructor(
        private headerService: ProfileHeaderService,
        private sidebarService: ProfileSidebarLeftService,
        private activeRoute: ActivatedRoute,
        private statisticsService: StatisticsService) {}

    ngOnInit() {
        // Resolvers data //
        this.identity = this.activeRoute.snapshot.data['identity'];
        this.teams = this.activeRoute.snapshot.data['teams'];

        // Component data //
        this.headerService.changeTitle(this.identity.organisation.name + '\'s Statistics');
        this.sidebarService.changeCurrentMenuItem('statistics');

        this.tabSubscription = this.statisticsService.current_statistics_tab.subscribe((tab: string) => {
            setTimeout(() => {
                this.active_tab = tab;
            }, 100);

        })

    }

    toggleMenu(){
        this.currentState = !this.currentState;
    }

    ngOnDestroy() {
        this.tabSubscription.unsubscribe();
    }
}
