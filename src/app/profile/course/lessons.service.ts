import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Create_lesson_request, Create_lesson_response} from "./edit/curriculum/lesson-new/lesson-new.model";
import {
    Delete_lesson_response,
    Get_lesson_details_response, Update_lesson_request,
    Update_lesson_response, Add_youtube_media_request, Add_youtube_media_response, Delete_youtube_media_response,
    Delete_media_response
} from "./edit/curriculum/lesson-edit/lesson-edit.model";
import {GlobalSpinnerService} from "../../spinner/global/global-spinner.service";
import {
    Get_lesson_comments_response,
    Update_lesson_progress_request,
    Update_lesson_progress_response
} from "./view/lesson/course-view-lesson.model";

@Injectable()

export class LessonsService {

    private apiUrl: string = '';

    constructor(private http: HttpClient,
                private globalSpinner: GlobalSpinnerService) {
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/lessons/';
    }

    public getMediaUploadUrl(): string {
        return this.apiUrl + 'upload_media/'
    }

    public createLesson(request: Create_lesson_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'create', request)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Lesson created!');
                return new Create_lesson_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Create_lesson_response().deserialize(response.error)]
            })
    }

    public getLesson(lesson_id: number): Observable<any> {
        return this.http.get(this.apiUrl + 'details/' + lesson_id)
            .map((response: HttpResponse<any>) => {
                return new Get_lesson_details_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                return [new Get_lesson_details_response().deserialize(response.error)]
            })
    }

    public updateDetails(lesson_id: number, request: Update_lesson_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'update_details/' + lesson_id, request)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Lesson details saved!');
                return new Update_lesson_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Update_lesson_response().deserialize(response.error)]
            })
    }

    public deleteLesson(lesson_id: number): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.delete(this.apiUrl + lesson_id, {})
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Lesson deleted!');
                return new Delete_lesson_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinner();
                return [new Delete_lesson_response().deserialize(response.error)]
            })
    }

    public updateProgress(lesson_id: number, request: Update_lesson_progress_request): Observable<any> {
        return this.http.post(this.apiUrl + 'update_progress/' + lesson_id, request)
            .map((response: HttpResponse<any>) => {
                return new Update_lesson_progress_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                return [new Update_lesson_progress_response().deserialize(response.error)]
            })
    }

    public addYoutubeMedia(lesson_id: number, request: Add_youtube_media_request): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.post(this.apiUrl + 'add_youtube_media/' + lesson_id, request)
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Youtube Media added!');
                return new Add_youtube_media_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something went wrong!');
                return [new Add_youtube_media_response().deserialize(response.error)]
            })
    }

    public deleteYoutubeMedia(media_id: number): Observable<any> {
        this.globalSpinner.showSpinner();
        return this.http.delete(this.apiUrl + 'delete_youtube_media/' + media_id, {})
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Youtube Media deleted!');
                return new Delete_youtube_media_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something went wrong!');
                return [new Delete_youtube_media_response().deserialize(response.error)]
            })
    }

    public deleteMedia(media_id: number): Observable<Delete_media_response> {
        this.globalSpinner.showSpinner();
        return this.http.delete(this.apiUrl + 'delete_media/' + media_id, {})
            .map((response: HttpResponse<any>) => {
                this.globalSpinner.hideSpinnerWithFeedback('Media deleted!');
                return new Delete_media_response().deserialize(response);
            }).catch((response: HttpErrorResponse) => {
                this.globalSpinner.hideSpinnerWithFeedback('Something went wrong!');
                return [new Delete_media_response().deserialize(response.error)]
            })
    }

    public getLessonComments(lesson_id: number): Observable<any> {
        return this.http.get(this.apiUrl + 'comments/' + lesson_id, {})
            .map((responseComments: HttpResponse<any>) => {
                return new Get_lesson_comments_response().deserialize(responseComments);
            }).catch((responseComments: HttpErrorResponse) => {
                return [new Get_lesson_comments_response().deserialize(responseComments.error)]
            })
    }
}