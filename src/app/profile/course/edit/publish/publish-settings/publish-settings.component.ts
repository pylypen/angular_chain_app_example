import {Component, OnDestroy, OnInit} from "@angular/core";
import {CourseService} from "../../../course.service";
import {Course} from "../../../../../shared/Course.model";
import {
    Course_publish_config,
    Update_course_display_request,
    Update_course_display_response
} from "../course-edit-publish.model";
import {MatSlideToggleChange} from "@angular/material";
import {MarketplaceService} from "../../../marketplace.service";
import { Subscription } from "rxjs";

@Component({
    templateUrl: './publish-settings.component.html'
})
export class PublishSettingsComponent implements OnInit, OnDestroy {

    course: Course = new Course();

    config: Course_publish_config = new Course_publish_config();

    course_subscription: Subscription;
    publish_subscription: Subscription;

    constructor(private courseService: CourseService,
                private marketplaceService: MarketplaceService) {
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

    publishUnpublish(event: MatSlideToggleChange, team_id: number, course_id: number) : void{
        let request = new Update_course_display_request();
        request.team_id = team_id;
        request.course_id = course_id;
        request.show = event.checked;
        this.marketplaceService.displayHide(request)
            .subscribe((resp: Update_course_display_response) => {
                if (resp.success) {
                    //todo: do anything if required
                }
            });

    }


}
