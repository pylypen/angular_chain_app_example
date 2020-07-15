import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {GlobalSpinnerService} from "../../spinner/global/global-spinner.service";
import {
    Get_lesson_comments_response, Post_comment_response,
} from "./view/lesson/course-view-lesson.model";
import {Lesson_comments} from "../../shared/Lesson_comments.model";

@Injectable()

export class LessonCommentsService {

    private apiUrl: string = '';

    constructor(private http: HttpClient,
                private globalSpinner: GlobalSpinnerService) {
        this.apiUrl = '//' + Environment.apiDomain + '/' + Environment.apiVersion + '/lesson_comments/';
    }


    public getLessonComments(lesson_id: number): Observable<any> {
        return this.http.get(this.apiUrl + 'list/' + lesson_id, {})
            .map((resp: HttpResponse<any>) => {
                return new Get_lesson_comments_response().deserialize(resp);
            }).catch((resp: HttpErrorResponse) => {
                return [new Get_lesson_comments_response().deserialize(resp.error)]
            })
    }

    public postComment(request: Lesson_comments): Observable<any> {
        return this.http.post(this.apiUrl + 'create', request)
            .map((resp: HttpResponse<any>) => {
                return new Post_comment_response().deserialize(resp);
            }).catch((resp: HttpErrorResponse) => {
                return [new Post_comment_response().deserialize(resp.error)];
            })
    }

    public updateComment(request: Lesson_comments): Observable<any> {
        return this.http.post(this.apiUrl + 'update', request)
            .map((resp: HttpResponse<any>) => {
                return new Get_lesson_comments_response().deserialize(resp);
            }).catch((resp: HttpErrorResponse) => {
                return [new Post_comment_response().deserialize(resp.error)];
            })
    }

    public deleteComment(comment_id: number): Observable<any> {
        return this.http.delete(this.apiUrl + comment_id, {})
            .map((responseComments: HttpResponse<any>) => {
                return new Get_lesson_comments_response().deserialize(responseComments);
            }).catch((resp: HttpErrorResponse) => {
                return [new Post_comment_response().deserialize(resp.error)];
            })
    }
}