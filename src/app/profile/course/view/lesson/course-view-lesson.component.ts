import {Component, OnDestroy, OnInit} from "@angular/core";
import {CourseService} from "../../course.service";
import {Course} from "../../../../shared/Course.model";

import {ActivatedRoute, Router} from "@angular/router";

import {Identity} from "../../../../services/auth.identity.model";
import {AuthService} from "../../../../services/auth.service";
import {Lesson} from "../../../../shared/Lesson.model";
import {LessonsService} from "../../lessons.service";
import {Get_lesson_details_response} from "../../edit/curriculum/lesson-edit/lesson-edit.model";
import {
    Get_lesson_comments_response, Post_comment_response, Update_lesson_progress_request,
    Update_lesson_progress_response
} from "./course-view-lesson.model";
import {Lesson_comments} from "../../../../shared/Lesson_comments.model";
import {LessonCommentsService} from "../../lesson-comments.service";
import {User} from "../../../../shared/User.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    templateUrl: './course-view-lesson.component.html'
})

export class CourseViewLessonComponent implements OnInit, OnDestroy {

    identity: Identity;
    course: Course = new Course();
    lesson: Lesson = new Lesson();
    lessonComments: Array<Lesson_comments> = [];

    mentionItems: Array<User> = [];
    mentionConfig: any = {
        labelKey: 'nickname'
    };

    new_comment: Lesson_comments = new Lesson_comments();

    prev_lesson_id: number = null;
    next_lesson_id: number = null;

    private subscriptions = new Subject();

    timeout_handle: any = 0;

    constructor(
        private courseService: CourseService,
        private lessonService: LessonsService,
        private lessonCommentsService: LessonCommentsService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private authService: AuthService) {
        this.identity = this.authService.getCurrentUser();
    }

    ngOnInit() {
        this.courseService.current_working_course
            .pipe(takeUntil(this.subscriptions))
            .subscribe((course: Course) => {
                this.course = course;
            });

        this.activeRoute.params
            .subscribe(params => {

                this.lessonService.getLesson(params['lesson_id'])
                    .pipe(takeUntil(this.subscriptions))
                    .subscribe((result: Get_lesson_details_response) => {
                        clearTimeout(this.timeout_handle);
                        if (result.success) {
                            this.lesson = result.data;

                            this.new_comment.lesson_id = this.lesson.id;
                            this.new_comment.user_id = this.identity.user.id;
                            this.new_comment.comment = '';

                            let lesson_order = this.lesson.order;

                            for (let i in this.course.lessons) {
                                if (this.course.lessons[i].order == lesson_order) {
                                    this.prev_lesson_id = (this.course.lessons[parseInt(i) - 1]) ? this.course.lessons[parseInt(i) - 1].id : null;
                                    this.next_lesson_id = (this.course.lessons[parseInt(i) + 1]) ? this.course.lessons[parseInt(i) + 1].id : null;
                                    break;
                                }
                            }

                            switch (this.lesson.progress.progress_status.id) {
                                case 1: {
                                    this.startTracking();
                                    break;
                                }
                                case 2: {
                                    this.trackHalfWay();
                                    break;
                                }
                                case 3: {
                                    this.trackNearlyDone();
                                    break;
                                }
                                default:
                                case 4: {
                                    break;
                                }
                            }

                            // get lesson comments now if needed
                            if (this.lesson.allow_comments) {
                                this.lessonCommentsService.getLessonComments(this.lesson.id)
                                    .pipe(takeUntil(this.subscriptions))
                                    .subscribe((resp: Get_lesson_comments_response) => {
                                        if (resp.success) {
                                            this.lessonComments = resp.data.comments;
                                            this.mentionItems = resp.data.mention_list;
                                        }
                                    });
                            }
                        }
                    });
            });
    }

    ngOnDestroy() {
        this.subscriptions.next();
        this.subscriptions.complete();

        clearTimeout(this.timeout_handle);
    }

    completeLesson() {
        clearTimeout(this.timeout_handle);
        this.makeProgressUpdateRequest(5, () => {
            if (this.next_lesson_id) {
                this.router.navigate(['/profile/course/' + this.course.id + '/view/lesson/' + this.next_lesson_id]);
            } else {
                this.router.navigate(['/profile/course/' + this.course.id + '/view']);
            }
        });
    }

    postComment() {
        this.lessonCommentsService.postComment(this.new_comment)
            .pipe(takeUntil(this.subscriptions))
            .subscribe((resp: Post_comment_response) => {
                if (resp.success) {
                    this.new_comment.comment = '';
                    resp.data.addStyling();
                    this.lessonComments.unshift(resp.data);
                }
            })
    }

    deleteComment(comment_id: number) {
        this.lessonCommentsService.deleteComment(comment_id)
            .pipe(takeUntil(this.subscriptions))
            .subscribe((resp: Get_lesson_comments_response) => {
                if (resp.success) {
                    this.lessonComments = resp.data.comments;
                }
            });
    }

    updateComment(comment: Lesson_comments) {
        this.lessonCommentsService.updateComment(comment)
            .pipe(takeUntil(this.subscriptions))
            .subscribe((resp: Get_lesson_comments_response) => {
                if (resp.success) {
                    this.lessonComments = resp.data.comments;
                }
            });
    }

    private startTracking() {
        this.makeProgressUpdateRequest(2, () => {
            this.trackHalfWay()
        });
    }

    private trackHalfWay() {
        this.timeout_handle = setTimeout(() => {
            this.makeProgressUpdateRequest(3, () => {
                this.trackNearlyDone();
            })
        }, 30000) // 0.5 minutes = 30000
    }

    private trackNearlyDone() {
        this.timeout_handle = setTimeout(() => {
            this.makeProgressUpdateRequest(4, false)
        }, 60000) // 1 minute = 60000
    }

    private makeProgressUpdateRequest(status: number, callback: any) {
        let request: Update_lesson_progress_request = new Update_lesson_progress_request();
        request.progress_status_id = status;
        this.lessonService.updateProgress(this.lesson.id, request)
            .pipe(takeUntil(this.subscriptions))
            .subscribe((resp: Update_lesson_progress_response) => {
                if (resp.success) {
                    this.lesson.progress.progress_status = resp.data;
                    this.course.lessons[this.lesson.order - 1].progress.progress_status = resp.data;
                    this.courseService.changeCurrentWorkingCourse(this.course);
                    if (callback) {
                        callback();
                    }
                }
            });
    }


}
