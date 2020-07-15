import {Component, OnDestroy, OnInit, Input} from "@angular/core";
import {ProfileSidebarLeftService} from "../../sidebar-left/profile-sidebar-left.service";
import {ProfileHeaderService} from "../../header/profile-header.service";
import {Course} from "../../../shared/Course.model";
import {CourseService} from "../course.service";
import {ActivatedRoute} from "@angular/router";
import { trigger, state, style, animate, transition } from '@angular/animations';
import {Subscription} from "rxjs";
import {SettingsService} from "../../settings/settings.service";
import {SettingsConfig} from "../../settings/settings.model";

@Component({
    templateUrl: './course-manage.component.html',
    animations: [
        trigger('responsiveMenu', [
          state('false', style({
          })),
          state('true', style({
              height: '15rem'
          })),
          transition('*=>false', animate('300ms')),
          transition('*=>true', animate('500ms'))
        ])
      ]
})
export class CourseManageComponent implements OnInit, OnDestroy {

    course: Course = new Course();
    course_id: number;
    active_tab: string = 'assign';
    @Input() currentState: boolean;
    routeSubscription: Subscription;
    tabSubscription: Subscription;
    config: SettingsConfig = new SettingsConfig();

    constructor(private headerService: ProfileHeaderService,
                private sidebarService: ProfileSidebarLeftService,
                private activeRoute: ActivatedRoute,
                private courseService: CourseService,
                private settingsService: SettingsService) {
        this.currentState = false;

        this.settingsService.getSettingsConfig().subscribe((result: SettingsConfig) => {
            this.config = result;
        });
    }

    ngOnInit() {
        this.headerService.changeTitle('Manage Course');
        this.sidebarService.changeCurrentMenuItem('courses');

        this.routeSubscription = this.activeRoute.params.subscribe(params => {
            this.course_id = params['course_id'];

            this.courseService.getCourseDetails(params['course_id'])
                .subscribe((result: Course) => {
                    this.course = result;
                    this.courseService.changeCurrentWorkingCourse(this.course);
                });
        });

        this.tabSubscription = this.courseService.current_manage_tab.subscribe((tab: string) => {
            setTimeout(() => {
                this.active_tab = tab;
            }, 100);

        })

    }

    toggleMenu(){
        this.currentState = !this.currentState;
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
        this.tabSubscription.unsubscribe();
    }

}
