import {Component, OnDestroy, OnInit} from "@angular/core";
import {CourseService} from "../../../course.service";
import {Course} from "../../../../../shared/Course.model";
import {Router} from "@angular/router";
import {
    Get_request_review_config_response,
    Course_publish_config,
    Request_review_request, Request_review_response
} from "../course-edit-publish.model";
import {MarketplaceService} from "../../../marketplace.service";
import { Subscription } from "rxjs";

@Component({
    templateUrl: './request-review.component.html'
})
export class RequestReviewComponent implements OnInit, OnDestroy {

    course: Course = new Course();

    config: Course_publish_config = new Course_publish_config();

    course_subscription: Subscription;
    publish_subscription: Subscription;

    constructor(private courseService: CourseService,
                private marketplaceService: MarketplaceService,
                private router: Router) {
    }

    ngOnInit() {
        this.course_subscription = this.courseService.current_working_course.subscribe((course: Course) => {
            this.course = course;
        });

        this.publish_subscription = this.courseService.current_publish_config.subscribe((config: Course_publish_config) => {
            this.config = config;
        });
    }

    ngOnDestroy() {
        this.course_subscription.unsubscribe();
        this.publish_subscription.unsubscribe();
    }


    requestReview(team_id: number): void {
        let request = new Request_review_request();
        request.team_id = team_id;
        request.course_id = this.course.id;
        this.marketplaceService.requestReview(request)
            .subscribe((resp: Request_review_response) => {
                if (resp.success) {
                    this.courseService.getCoursePublish(this.course.id)
                        .subscribe((response: Get_request_review_config_response) => {
                            if (response.success) {
                                this.courseService.changeCurrentPublishConfig(response.data);
                            }
                        });
                }
            });
    }


}
