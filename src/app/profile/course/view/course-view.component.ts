import {Component, OnInit} from "@angular/core";
import {ProfileHeaderService} from "../../header/profile-header.service";
import {ProfileSidebarLeftService} from "../../sidebar-left/profile-sidebar-left.service";
import {Course} from "../../../shared/Course.model";
import {CourseService} from "../course.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: './course-view.component.html'
})

export class CourseViewComponent implements OnInit {

    course: Course = new Course();

    constructor(
        private headerService: ProfileHeaderService,
        private sidebarService: ProfileSidebarLeftService,
        private activeRoute: ActivatedRoute,
        private courseService: CourseService) {
    }

    ngOnInit() {
        this.headerService.changeTitle('Course View');
        this.sidebarService.changeCurrentMenuItem('courses');

        this.course = this.activeRoute.snapshot.data['course'];
        this.courseService.changeCurrentWorkingCourse(this.course);
    }

}