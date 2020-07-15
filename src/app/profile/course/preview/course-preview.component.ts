import {Component, OnDestroy, OnInit} from "@angular/core";
import {Course} from "../../../shared/Course.model";
import {ActivatedRoute} from "@angular/router";
import {Identity} from "../../../services/auth.identity.model";
import {Lesson} from "../../../shared/Lesson.model";
import {ProfileSidebarLeftService} from "../../sidebar-left/profile-sidebar-left.service";
import {ProfileHeaderService} from "../../header/profile-header.service";


@Component({
    templateUrl: './course-preview.component.html'
})
export class CoursePreviewComponent implements OnInit, OnDestroy {

    identity: Identity;

    course: Course = new Course;
    course_id: number;

    current_lesson: Lesson = new Lesson();
    current_lesson_index: number = 0;

    page_mode = 'lesson';

    constructor(
        private sidebarService: ProfileSidebarLeftService,
        private headerService: ProfileHeaderService,
        private activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.headerService.disableNavigation();
        this.sidebarService.disableNavigation();
        this.headerService.changeTitle('Course Preview');

        this.course = this.activeRoute.snapshot.data['course'];
        this.identity = this.activeRoute.snapshot.data['identity'];

        if (this.course.lessons.length) {
            this.current_lesson = this.course.lessons[0];
            this.current_lesson_index = 0;
            this.page_mode = 'lesson';

        }
    }

    ngOnDestroy() {
        this.headerService.enableNavigation();
        this.sidebarService.enableNavigation();
    }

    prevLesson() {
        if (this.current_lesson_index > 0) {
            this.current_lesson_index--;
            this.current_lesson = this.course.lessons[this.current_lesson_index];
        }
    }

    nextLesson() {
        if (this.current_lesson_index < (this.course.lessons.length - 1)) {
            this.current_lesson_index++;
            this.current_lesson = this.course.lessons[this.current_lesson_index];
        }
    }

    jumpLesson(index: number) {
        this.current_lesson_index = index;
        this.current_lesson = this.course.lessons[this.current_lesson_index];
        this.page_mode = 'lesson';
    }

    setPageLessonMode() {
        if (this.course.lessons.length) {
            this.current_lesson = this.course.lessons[this.course.lessons.length - 1];
            this.current_lesson_index = this.course.lessons.length - 1;
            this.page_mode = 'lesson';
        }

    }
}
