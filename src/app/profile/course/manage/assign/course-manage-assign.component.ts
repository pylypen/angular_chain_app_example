import {Component, OnDestroy, OnInit} from "@angular/core";
import {CourseService} from "../../course.service";
import {Course} from "../../../../shared/Course.model";
import {Router} from "@angular/router";
import {MarketplaceService} from "../../marketplace.service";
import {
    Get_assign_config_response, Wildcard_assign_request, Assign_response,
    Personal_assign_request
} from "./course-manage-assign.model";
import {GlobalSpinnerService} from "../../../../spinner/global/global-spinner.service";
import {Marketplace} from "../../../../shared/Marketplace";
import {AuthService} from "../../../../services/auth.service";
import {Identity} from "../../../../services/auth.identity.model";
import {User} from "../../../../shared/User.model";
import {User_course} from "../../../../shared/User_course.model";
import { Subscription } from "rxjs";



@Component({
    templateUrl: './course-manage-assign.component.html'
})

export class CourseManageAssignComponent implements OnInit, OnDestroy {

    identity: Identity;

    course: Course = new Course();
    config: Array<Marketplace> = [];

    course_subscription: Subscription;

    constructor(private courseService: CourseService,
                private marketplaceService: MarketplaceService,
                private spinnerService: GlobalSpinnerService,
                private authService: AuthService,
                private router: Router) {
        this.identity = this.authService.getCurrentUser();
    }

    ngOnInit() {
        this.course_subscription = this.courseService.current_working_course.subscribe((course: Course) => {
            this.course = course;
            if (this.course.id) this.reloadConfig();

        });
        this.courseService.changeCurrentManageTab('assign');
    }

    ngOnDestroy() {
        this.course_subscription.unsubscribe();
    }

    wildcardAssign(marketplace: Marketplace, assign: boolean) {
        let request = new Wildcard_assign_request();
        request.marketplace_id = marketplace.id;
        request.is_obligatory = marketplace.is_wildcard_obligatory;
        request.assign = assign ? 1 : 0;

        this.marketplaceService.wildcardAssign(request)
            .subscribe((resp: Assign_response) => {
                if (resp.success) this.reloadConfig();
            });
    }

    personalAssign(selection: any, marketplace: Marketplace) {
        let request = new Personal_assign_request();
        request.marketplace_id = marketplace.id;
        request.users = selection.selectedOptions.selected.map((item: any) => item.value);

        this.marketplaceService.personalAssign(request)
            .subscribe((resp: Assign_response) => {
                if (resp.success) this.reloadConfig();
            });
    }

    shouldSelectAssigned(stack: Array<User_course>, needle: User) {
        if (stack.length) {
            for (let i in stack) {
                if (stack[i].user_id == needle.id) return true;
            }
        }
        return false;
    }

    private reloadConfig() {
        this.marketplaceService.getAssignsConfig(this.course.id)
            .subscribe((resp: Get_assign_config_response) => {
                if (resp.success) {
                    this.config = resp.data;
                } else {
                    this.spinnerService.feedback('Something went wrong!');
                    this.router.navigate(['/profile/courses']);
                }
            });
    }

}
