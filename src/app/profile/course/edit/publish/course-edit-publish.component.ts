import {Component, OnDestroy, OnInit} from "@angular/core";
import {CourseService} from "../../course.service";
import {Course} from "../../../../shared/Course.model";
import {Identity} from "../../../../services/auth.identity.model";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {Get_request_review_config_response} from "./course-edit-publish.model";
import { Subscription } from "rxjs";


@Component({
    templateUrl: './course-edit-publish.component.html'
})

export class CourseEditPublishComponent implements OnInit, OnDestroy {

    identity: Identity;
    course: Course;
    course_subscription: Subscription;

    constructor(private courseService: CourseService,
                private router: Router,
                private authService: AuthService) {
        this.identity = this.authService.getCurrentUser();
    }

    ngOnInit() {
        this.courseService.changeCurrentEditTab('publish');
        this.course_subscription = this.courseService.current_working_course.subscribe((course: Course) => {
            this.course = course;

            this.courseService.getCoursePublish(this.course.id)
                .subscribe((resp: Get_request_review_config_response) => {
                    if (resp.success) {
                        this.courseService.changeCurrentPublishConfig(resp.data);
                    } else {
                        this.router.navigate(['/profile/course/' + this.course.id + '/edit/details']);
                    }
                });
        });
    }

    ngOnDestroy() {
        this.course_subscription.unsubscribe();
    }


}
