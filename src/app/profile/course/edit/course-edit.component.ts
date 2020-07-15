import {Component, OnDestroy, OnInit, Input} from "@angular/core";
import {ProfileSidebarLeftService} from "../../sidebar-left/profile-sidebar-left.service";
import {ProfileHeaderService} from "../../header/profile-header.service";
import {Course} from "../../../shared/Course.model";
import {CourseService} from "../course.service";
import {ActivatedRoute} from "@angular/router";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BehaviorSubject, Subscription } from "rxjs";
@Component({
    templateUrl: './course-edit.component.html',
    animations: [
        trigger('responsiveMenu', [
          state('false', style({
          })),
          state('true', style({
              height: '16rem'
          })),
          transition('*=>false', animate('300ms')),
          transition('*=>true', animate('500ms'))
        ])
      ]
})
export class CourseEditComponent implements OnInit, OnDestroy {

    course: Course = new Course();
    active_tab: string = 'details';

    courseSource: BehaviorSubject<Course> = new BehaviorSubject(new Course());
    courseObserver = this.courseSource.asObservable();

    private tabSubscription: Subscription;
    private course_subscription: Subscription;

    @Input() currentState: boolean = false;

    constructor(
        private headerService: ProfileHeaderService,
        private sidebarService: ProfileSidebarLeftService,
        private activeRoute: ActivatedRoute,
        private courseService: CourseService) {}

    ngOnInit() {
        this.headerService.changeTitle('Edit Course');
        this.sidebarService.changeCurrentMenuItem('courses');

        this.course = this.activeRoute.snapshot.data['course'];
        this.courseService.changeCurrentWorkingCourse(this.course);

        this.course_subscription = this.courseService.current_working_course.subscribe((course: Course) => {
            this.course = course;
        });

        this.tabSubscription = this.courseService.current_edit_tab.subscribe((tab: string) => {
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
        this.course_subscription.unsubscribe();
    }

}
