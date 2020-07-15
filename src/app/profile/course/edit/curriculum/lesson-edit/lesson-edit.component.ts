import {Component, OnDestroy, OnInit} from "@angular/core";
import {CourseService} from "../../../course.service";
import {Course} from "../../../../../shared/Course.model";
import {ProfileHeaderService} from "../../../../header/profile-header.service";
import {Lesson} from "../../../../../shared/Lesson.model";
import {LessonsService} from "../../../lessons.service";
import {ActivatedRoute, Router} from "@angular/router";
import {
    Add_youtube_media_errors,
    Add_youtube_media_request, Add_youtube_media_response,
    Delete_lesson_errors,
    Delete_lesson_response, Delete_youtube_media_response,
    Get_lesson_details_response, Update_lesson_errors, Update_lesson_request,
    Update_lesson_response, Upload_media_errors, Upload_media_response, Update_lesson_content_order_request, Update_lesson_content_order_errors, Get_lesson_media_types_response, Update_lesson_content_order_response
} from "./lesson-edit.model";
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {Identity} from "../../../../../services/auth.identity.model";
import {AuthService} from "../../../../../services/auth.service";
import { Subscription } from "rxjs";
import { Media } from "../../../../../shared/Media.model";
import { DragulaService } from "ng2-dragula";
import { GlobalSpinnerService } from "../../../../../spinner/global/global-spinner.service";
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    templateUrl: './lesson-edit.component.html',
    styleUrls: ['./lesson-edit.scss']
})

export class LessonEditComponent implements OnInit, OnDestroy {

    course: Course;
    identity: Identity;
    lesson: Lesson = new Lesson();
    errors: Update_lesson_errors = new Update_lesson_errors();
    delete_errors: Delete_lesson_errors = new Delete_lesson_errors();

    youtube_media: Add_youtube_media_request = new Add_youtube_media_request();
    youtube_errors: Add_youtube_media_errors = new Add_youtube_media_errors();

    editor_config: AngularEditorConfig;
    media_uploader: FileUploader;

    media_errors: Array<Upload_media_errors> = [];

    course_subscription: Subscription;
    route_subscription: Subscription;
    dragula_subscription: Subscription;

    used_media: Array<Media> = new Array<Media>();

    save_order_request: Update_lesson_content_order_request = new Update_lesson_content_order_request();
    save_order_errors: Update_lesson_content_order_errors = new Update_lesson_content_order_errors();

    constructor(private courseService: CourseService,
                private authService: AuthService,
                private headerService: ProfileHeaderService,
                private lessonService: LessonsService,
                private globalSpinner: GlobalSpinnerService,
                private dragulaService: DragulaService,
                private activeRoute: ActivatedRoute,
                private router: Router) {

        this.identity = this.authService.getCurrentUser();

        this.editor_config = {
            editable: true,
            spellcheck: true,
            height: '15rem',
            minHeight: '5rem',
            placeholder: 'Enter text here...',
            translate: 'no',
            sanitize: false,
        };
    }

    ngOnInit() {
        this.headerService.changeTitle('Edit Lesson');

        this.course_subscription = this.courseService.current_working_course.subscribe((course: Course) => {
            this.course = course;

        });

        this.dragulaService.setOptions('content_order', {
            moves: function (el: HTMLElement): boolean {
                if (el.classList.contains('undraggable')) {
                    return false;
                }
                return true;
            },
        });

        this.dragula_subscription = this.dragulaService.dropModel.subscribe(() => {
            this.saveOrder(this.save_order_request);
        })

        this.route_subscription = this.activeRoute.params.subscribe(params => {

            this.getMediaTypes(params['lesson_id']);

            this.lessonService.getLesson(params['lesson_id'])
                .subscribe((response: Get_lesson_details_response) => {
                    if (response.success) {
                        this.lesson = response.data;
                        // once lesson is inited, going to init uploader and etc

                        this.media_uploader = new FileUploader({
                            url: this.lessonService.getMediaUploadUrl() + this.lesson.id,
                            autoUpload: true,
                            method: 'POST',
                            itemAlias: 'file',
                            isHTML5: true,
                            headers: [
                                {
                                    name: 'Authorization',
                                    value: 'Bearer ' + this.identity.token
                                }
                            ]
                        });

                        this.media_uploader.onBeforeUploadItem = (item: FileItem) => {
                            item.withCredentials = false;
                        };

                        this.media_uploader.onErrorItem = (item: FileItem, resp: string, status: number, headers: ParsedResponseHeaders) => {
                            let uploadMediaError: Upload_media_errors = new Upload_media_errors();
                            switch (status) {
                                case 500:
                                case 422: {
                                    let response: Upload_media_response = new Upload_media_response().deserialize(JSON.parse(resp));
                                    uploadMediaError = response.errors;
                                    break;
                                }
                                // It cant recognize 413 status! Lol!
                                /* case 413: {
                                     uploadMediaError.file.display = true;
                                     uploadMediaError.file.message = 'Oops, this file is too large. Please upload files smaller than 100mb.';
                                     break;
                                 }*/
                                default: {
                                    if (item.file.size > 400000000) {
                                        uploadMediaError.file.display = true;
                                        uploadMediaError.file.message = 'Oops, this file is too large. Please upload files smaller than 400mb.';
                                        break;
                                    }

                                    uploadMediaError.file.display = true;
                                    uploadMediaError.file.message = 'Hmm, something went wrong and we’re not quite sure what. Please <a href=“mailto:support@churchlearn.com?subject=Problems%20uploading%20a%20file” target=“_blank”>contact support</a>.';
                                    break;
                                }
                            }

                            this.media_errors[item.file.name] = uploadMediaError;
                        };

                        this.media_uploader.onAfterAddingFile = (item: FileItem) => {
                            this.media_errors[item.file.name] = new Upload_media_errors();
                        };

                        this.media_uploader.onCancelItem = (item: FileItem) => {
                            delete(this.media_errors[item.file.name]);
                        };

                        this.media_uploader.onSuccessItem = (item: FileItem) => {
                            setTimeout(() => {
                                this.removeUploaderQueueItem(item);
                            }, 1000)
                        };

                        this.media_uploader.onCompleteAll = () => {
                            this.lessonService.getLesson(this.lesson.id)
                                .subscribe((response: Get_lesson_details_response) => {
                                    if (response.success) {
                                        this.lesson.video_media = response.data.video_media;
                                        this.lesson.audio_media = response.data.audio_media;
                                        this.lesson.document_media = response.data.document_media;
                                        this.lesson.articulate_media = response.data.articulate_media;
                                    }
                                });
                        };
                        this.courseService.getLessonMediaTypes(this.lesson.id).subscribe((res: Get_lesson_media_types_response) => {
                            this.used_media = res.data.uses;
                        })
                    }
                });
        });
    }

    ngOnDestroy() {
        this.course_subscription.unsubscribe();
        this.route_subscription.unsubscribe();
        this.dragula_subscription.unsubscribe();
        this.dragulaService.destroy('content_order');
    }

    removeUploaderQueueItem(item: FileItem): void {
        delete(this.media_errors[item.file.name]);
        item.remove();
    }

    getMediaTypes(lesson_id: number){
        this.courseService.getLessonMediaTypes(lesson_id).subscribe((res: Get_lesson_media_types_response) => {
            this.save_order_request.lesson_id = lesson_id;
            this.save_order_request.uses = res.data.uses;
            this.save_order_request.library = res.data.library;
        })
    }

    addYoutubeMedia() {
        this.lessonService.addYoutubeMedia(this.lesson.id, this.youtube_media)
            .subscribe((resp: Add_youtube_media_response) => {
                this.youtube_errors = resp.errors;
                if (resp.success) {
                    this.lesson.embed_youtube_media = resp.data;
                    this.youtube_media.src = '';
                }
            });
    }

    saveOrder(request: Update_lesson_content_order_request){
        this.courseService.saveLessonContentOrder(request).subscribe((res: Update_lesson_content_order_response) => {
            this.save_order_errors = res.errors;
            if(res.errors.uses.display) this.globalSpinner.hideSpinnerWithFeedback('You must select at least one type of media');
            if(res.success) {
                this.globalSpinner.hideSpinnerWithFeedback('Order successfully saved');
                this.courseService.getLessonMediaTypes(this.lesson.id).subscribe((res: Get_lesson_media_types_response) => {
                    this.used_media = res.data.uses;
                })
            }
        })
    }

    deleteMedia(media_id: number) {
        this.lessonService.deleteMedia(media_id)
            .subscribe((resp: Delete_youtube_media_response) => {
                if (resp.success) {
                    this.lessonService.getLesson(this.lesson.id)
                        .subscribe((response: Get_lesson_details_response) => {
                            if (response.success) {
                                this.lesson.video_media = response.data.video_media;
                                this.lesson.audio_media = response.data.audio_media;
                                this.lesson.document_media = response.data.document_media;
                                this.lesson.articulate_media = response.data.articulate_media;
                            }
                        });
                }
            })
    }

    deleteYoutubeMedia(media_id: number) {
        this.lessonService.deleteYoutubeMedia(media_id)
            .subscribe((resp: Delete_youtube_media_response) => {
                if (resp.success) {
                    this.lesson.embed_youtube_media = resp.data;
                }
            })
    }

    updateLesson() {
        this.lessonService.updateDetails(this.lesson.id, new Update_lesson_request().deserialize(this.lesson))
            .subscribe((response: Update_lesson_response) => {
                if (response.success) {
                    this.errors = new Update_lesson_errors();
                    this.courseService.changeCurrentWorkingCourse(response.data);
                } else {
                    this.errors = response.errors;
                }
            });
    }

    deleteLesson() {
        this.lessonService.deleteLesson(this.lesson.id)
            .subscribe((response: Delete_lesson_response) => {
                if (response.success) {
                    this.delete_errors = new Delete_lesson_errors();
                    this.courseService.changeCurrentWorkingCourse(response.data);
                    this.router.navigate(['/profile/course/' + this.course.id + '/edit/curriculum']);
                } else {
                    this.delete_errors = response.errors;
                }
            })
    }

}
