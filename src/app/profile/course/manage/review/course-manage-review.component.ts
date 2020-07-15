import {Component, OnDestroy, OnInit} from "@angular/core";
import {CourseService} from "../../course.service";
import {Course} from "../../../../shared/Course.model";
import {Identity} from "../../../../services/auth.identity.model";
import {AuthService} from "../../../../services/auth.service";
import {Lesson} from "../../../../shared/Lesson.model";
import {Get_managing_list_response} from "./course-manage-review.model";
import {ApproveSettingsModalComponent} from "./approve-settings-modal/approve-settings.modal.component";
import {MatDialog, MatDialogRef} from "@angular/material";
import {Default_modal_700_width} from "../../../../shared/Modal.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";


@Component({
    templateUrl: './course-manage-review.component.html'
})

export class CourseManageReviewComponent implements OnInit, OnDestroy {

    identity: Identity;
    course: Course;
    managing_list: Array<Course> = [];

    current_lesson: Lesson = new Lesson();
    current_lesson_index: number = 0;

    page_mode = 'lesson';

    dialog_ref: MatDialogRef<ApproveSettingsModalComponent> = null;

    private subscriptions = new Subject();

    constructor(private courseService: CourseService,
                private authService: AuthService,
                private dialog: MatDialog) {
        this.identity = this.authService.getCurrentUser();
    }

    ngOnInit() {
        this.courseService.changeCurrentManageTab('review');
        this.courseService.current_working_course
            .pipe(takeUntil(this.subscriptions))
            .subscribe((course: Course) => {

                this.course = course;

                if (this.course.lessons.length) {
                    this.current_lesson = this.course.lessons[0];
                    this.current_lesson_index = 0;
                    this.page_mode = 'lesson';

                }

                this.courseService.getManagingList()
                    .pipe(takeUntil(this.subscriptions))
                    .subscribe((result: Get_managing_list_response) => {
                        if (result.success) {
                            this.managing_list = result.data;
                        }
                    });

            });
    }

    ngOnDestroy() {
        this.subscriptions.next();
        this.subscriptions.complete();

        if (this.dialog_ref instanceof MatDialogRef) {
            this.dialog_ref.close();
        }
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

    openApproveSettingsDialog() {
        let config: Default_modal_700_width = new Default_modal_700_width().deserialize({course_id: this.course.id});
        this.dialog_ref = this.dialog.open(ApproveSettingsModalComponent, config);
    }

}
