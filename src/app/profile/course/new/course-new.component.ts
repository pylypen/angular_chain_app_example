import {Component, OnInit} from "@angular/core";
import {ProfileHeaderService} from "../../header/profile-header.service";
import {ProfileSidebarLeftService} from "../../sidebar-left/profile-sidebar-left.service";
import {Course} from "../../../shared/Course.model";
import {Create_course_errors, Create_course_request, Create_course_response} from "./course-new.model";
import {CourseService} from "../course.service";
import {Router} from "@angular/router";

@Component({
    templateUrl: './course-new.component.html'
})
export class CourseNewComponent implements OnInit {

    course: Course = new Course();
    errors: Create_course_errors = new Create_course_errors();

    constructor(
        private headerService: ProfileHeaderService,
        private sidebarService: ProfileSidebarLeftService,
        private router: Router,
        private courseService: CourseService) {
    }

    ngOnInit() {
        this.headerService.changeTitle('Create Course');
        this.sidebarService.changeCurrentMenuItem('courses');
    }

    createCourse() {
        this.courseService.createCourse(new Create_course_request().deserialize(this.course))
            .subscribe((response: Create_course_response) => {
                if (response.success) {
                    this.errors = new Create_course_errors();
                    this.router.navigate(['/profile/course/' + response.data.id + '/edit/details']);
                    return;
                } else this.errors = response.errors;
            });
    }

}