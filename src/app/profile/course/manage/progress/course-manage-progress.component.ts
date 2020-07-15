import {Component, OnDestroy, OnInit} from "@angular/core";
import {CourseService} from "../../course.service";
import {Course} from "../../../../shared/Course.model";
import {Router} from "@angular/router";
import {MarketplaceService} from "../../marketplace.service";
import {AuthService} from "../../../../services/auth.service";
import {Identity} from "../../../../services/auth.identity.model";
import { MatTableDataSource } from "@angular/material";
import { Subscription } from "rxjs";
@Component({
    templateUrl: './course-manage-progress.component.html'
})

export class CourseManageProgressComponent implements OnInit, OnDestroy {

    identity: Identity;

    course: Course = new Course();
    config: Array<any> = [];
    displayedColumns: string[] = ['username', 'email', 'progress'];
    dataSource =  new MatTableDataSource(this.config);
    course_subscription: Subscription;

    constructor(private courseService: CourseService,
                private marketplaceService: MarketplaceService,
                private authService: AuthService,
                private router: Router) {
        this.identity = this.authService.getCurrentUser();
    }

    ngOnInit() {
        this.course_subscription = this.courseService.current_working_course.subscribe((course: Course) => {
            this.course = course;
            if (this.course.id) {
                this.marketplaceService.getCourseDetails(this.course.id)
                    .subscribe((resp: any) => {
                        if (resp.success) {
                            this.config = resp.data;
                            this.dataSource = new MatTableDataSource(resp.data);
                        }
                    });
            }
        });
        this.courseService.changeCurrentManageTab('progress');
    }

    ngOnDestroy() {
        this.course_subscription.unsubscribe();
    }

}
