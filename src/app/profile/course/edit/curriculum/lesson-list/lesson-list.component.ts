import {Component, OnDestroy, OnInit} from "@angular/core";
import {CourseService} from "../../../course.service";
import {AuthService} from "../../../../../services/auth.service";
import {Course} from "../../../../../shared/Course.model";
import {DragulaService} from "ng2-dragula";
import {
    Order, Update_lessons_order_errors, Update_lessons_order_request,
    Update_lessons_order_response
} from "./lesson-list.model";
import { Subscription } from "rxjs";

@Component({
    templateUrl: './lesson-list.component.html'
})
export class LessonListComponent implements OnInit, OnDestroy {

    course: Course;

    errors: Update_lessons_order_errors = new Update_lessons_order_errors();

    course_subscription: Subscription;

    constructor(private courseService: CourseService,
                private dragulaService: DragulaService) {

        dragulaService.setOptions('lessons-list', {
            moves: function (el: HTMLElement, target: HTMLElement, source: HTMLElement): boolean {
                if(source.classList.contains('drag-handle')) return true;
            }
        });
    }

    ngOnInit() {
        this.course_subscription = this.courseService.current_working_course.subscribe((course: Course) => {
            this.course = course
        });
    }

    ngOnDestroy() {
        this.course_subscription.unsubscribe();
        this.dragulaService.destroy('lessons-list');
    }

    updateOrder() {
        let request: Update_lessons_order_request = new Update_lessons_order_request();
        for (let i in this.course.lessons) {
            request.order.push(new Order().deserialize({
                lesson_id: this.course.lessons[i].id,
                new_order: parseInt(i) + 1
            }));
        }

        this.courseService.updateLessonsOrder(this.course.id, request)
            .subscribe((response: Update_lessons_order_response) => {
                if (response.success) {
                    this.errors = new Update_lessons_order_errors();
                    this.courseService.changeCurrentWorkingCourse(response.data)
                } else this.errors = response.errors;
            });
    }

}
