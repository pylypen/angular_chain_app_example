import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Course} from "../../shared/Course.model";
import {
    Get_course_details_response
} from "./course.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {
    Delete_course_response, Reset_featured_bg_response, Reset_thumbnail_response, Update_course_details_request,
    Update_course_details_response
} from "./edit/details/course-edit-details.model";
import {Create_course_request, Create_course_response} from "./new/course-new.model";
import {
    Update_lessons_order_request,
    Update_lessons_order_response
} from "./edit/curriculum/lesson-list/lesson-list.model";
import {GlobalSpinnerService} from "../../spinner/global/global-spinner.service";
import {Course_publish_config, Get_request_review_config_response} from "./edit/publish/course-edit-publish.model";
import {Get_managing_list_response} from "./manage/review/course-manage-review.model";
import { Get_lesson_media_types_response, Update_lesson_content_order_response } from "./edit/curriculum/lesson-edit/lesson-edit.model";

@Injectable()

export class CourseService {

    private apiUrl: string = '';

    private working_course_source = new BehaviorSubject<Course>(new Course());
    public current_working_course = this.working_course_source.asObservable();

    private publish_config_sourse = new BehaviorSubject<Course_publish_config>(new Course_publish_config());
    public current_publish_config = this.publish_config_sourse.asObservable();

    private edit_tab_source = new BehaviorSubject<string>('details');
    public current_edit_tab = this.edit_tab_source.asObservable();

    private manage_tab_source = new BehaviorSubject<string>('assign');
    public current_manage_tab = this.manage_tab_source.asObservable();


    constructor(private http: HttpClient,
                private globalSpinner: GlobalSpinnerService) {
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/courses/';
    }

    public getThumbnailUploadUrl(): string {
        return this.apiUrl + 'update_thumbnail/';
    }

    public getFeaturedBgUploadUrl(): string {
        return this.apiUrl + 'update_featured_background/';
    }

    public changeCurrentWorkingCourse(course: Course) {
        this.working_course_source.next(course)
    }

    public changeCurrentEditTab(tab: string) {
        this.edit_tab_source.next(tab);
    }

    public changeCurrentManageTab(tab: string) {
        this.manage_tab_source.next(tab);
    }

    public changeCurrentPublishConfig(config: Course_publish_config) {
        this.publish_config_sourse.next(config);
    }


    public createCourse(request: Create_course_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'create', request)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Course created!');
                return new Create_course_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Create_course_response().deserialize(response.error)]
            })
    }

    public getManagingList(): Observable<any> {
        return this.http.get(this.apiUrl + 'managing_list', {})
            .map((response: HttpResponse<any>) => {
                return new Get_managing_list_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                return [new Get_managing_list_response().deserialize(response.error)]
            })
    }

    public getCourseDetails(course_id: number): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.get(this.apiUrl + 'details/' + course_id, {})
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinner();
                return new Get_course_details_response().deserialize(resp).data;
            }).catch((error: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [error];
            });
    }

    public getCoursePublish(course_id: number): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.get(this.apiUrl + 'publish/' + course_id, {})
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinner();
                return new Get_request_review_config_response().deserialize(resp);
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Get_request_review_config_response().deserialize(resp.error)];
            });
    }

    public updateCourseDetails(course_id: number, details: Update_course_details_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'update_details/' + course_id, details)
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Course Details saved!');
                return new Update_course_details_response().deserialize(resp);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Update_course_details_response().deserialize(response.error)];
            });
    }

    public deleteCourse(course_id: number): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.delete(this.apiUrl + '' + course_id, {})
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Course deleted!');
                return new Delete_course_response().deserialize(resp);
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Delete_course_response().deserialize(resp.error)];
            })
    }

    public updateLessonsOrder(course_id: number, order: Update_lessons_order_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'update_order/' + course_id, order)
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Lessons Order saved!');
                return new Update_lessons_order_response().deserialize(resp);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Update_lessons_order_response().deserialize(response.error)];
            });
    }

    public resetThumbnail(course_id: number): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'reset_thumbnail/' + course_id, {})
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinner();
                return new Reset_thumbnail_response().deserialize(resp);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Reset_thumbnail_response().deserialize(response.error)];
            });
    }

    public resetFeaturedBg(course_id: number): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'reset_featured_background/' + course_id, {})
            .map((resp: HttpResponse<any>) => {
                this.globalSpinner.hideSpinner();
                return new Reset_featured_bg_response().deserialize(resp);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Reset_featured_bg_response().deserialize(response.error)];
            });
    }


    public getLessonMediaTypes(lesson_id: number){
        this.globalSpinner.showSpinner();
        return this.http.get(this.apiUrl + 'media_types_list/' + lesson_id)
            .map((resp: HttpResponse<Get_lesson_media_types_response>) => {
                this.globalSpinner.hideSpinner();
                let response = new Get_lesson_media_types_response().deserialize(resp);
                return response;
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Error. Something goes wrong. Please try again later');
                let response = new Get_lesson_media_types_response().deserialize(resp.error);
                return [response];
            })
    }


    public saveLessonContentOrder(request: any){
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'save_media_order', request)
            .map((resp: Update_lesson_content_order_response) => {
                this.globalSpinner.hideSpinnerWithFeedback('Lesson content order successfully saved');
                let response = new Update_lesson_content_order_response().deserialize(resp);
                return response;
            }).catch((resp: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something goes wrong');
                return [new Update_lesson_content_order_response().deserialize(resp.error)];
            })
    }

}
