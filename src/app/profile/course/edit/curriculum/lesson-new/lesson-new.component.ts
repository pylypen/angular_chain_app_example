import {Component, OnDestroy, OnInit} from "@angular/core";
import {CourseService} from "../../../course.service";
import {Course} from "../../../../../shared/Course.model";
import {ProfileHeaderService} from "../../../../header/profile-header.service";
import {Create_lesson_errors, Create_lesson_request, Create_lesson_response} from "./lesson-new.model";
import {LessonsService} from "../../../lessons.service";
import {Router} from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    templateUrl: './lesson-new.component.html'
})
export class LessonNewComponent implements OnInit, OnDestroy {

    course: Course = new Course();

    lesson_name: string = '';

    errors: Create_lesson_errors = new Create_lesson_errors();

    course_subscription: Subscription;

    constructor(
        private courseService: CourseService,
        private headerService: ProfileHeaderService,
        private lessonsService: LessonsService,
        private router: Router) {
    }

    ngOnInit() {
        this.headerService.changeTitle('Create Lesson');
        this.course_subscription = this.courseService.current_working_course.subscribe((course: Course) => {
            this.course = course;
        });
    }

    ngOnDestroy() {
        this.course_subscription.unsubscribe();
    }

    createLesson() {
        let request: Create_lesson_request = new Create_lesson_request();
        request.name = this.lesson_name;
        request.course_id = this.course.id;
        this.lessonsService.createLesson(request)
            .subscribe((result: Create_lesson_response) => {
                if (result.success) {
                    this.errors = new Create_lesson_errors();

                    this.course.lessons.push(result.data);
                    this.courseService.changeCurrentWorkingCourse(this.course);

                    this.router.navigate(['/profile/course/' + this.course.id + '/edit/curriculum/lesson/' + result.data.id + '/edit']);
                } else {
                    this.errors = result.errors;
                }
            });
    }

}
