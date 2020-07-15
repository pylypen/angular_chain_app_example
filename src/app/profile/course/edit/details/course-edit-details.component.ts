import {Component, OnDestroy, OnInit} from "@angular/core";
import {CourseService} from "../../course.service";
import {Course} from "../../../../shared/Course.model";
import {
    Delete_course_errors, Delete_course_response,
    Update_course_details_errors, Update_course_details_request,
    Update_course_details_response
} from "./course-edit-details.model";
import {Router} from "@angular/router";
import {Identity} from "../../../../services/auth.identity.model";
import {AuthService} from "../../../../services/auth.service";
import {Subscription} from "rxjs";
import {ImageCropModalService} from 'src/app/profile/settings/image-crop-modal/image-crop.modal.service';
import {ImageCropped} from 'src/app/shared/Image_cropper_default.model';
import {GlobalSpinnerService} from "../../../../spinner/global/global-spinner.service";


@Component({
    templateUrl: './course-edit-details.component.html',
    styleUrls: ['./course-edit-details.component.scss']
})
export class CourseEditDetailsComponent implements OnInit, OnDestroy {

    identity: Identity;

    course: Course;
    errors: Update_course_details_errors = new Update_course_details_errors();

    delete_errors: Delete_course_errors = new Delete_course_errors();

    private course_subscription: Subscription;
    private picture_subscription: Subscription;

    constructor(private courseService: CourseService,
                private spinner: GlobalSpinnerService,
                private router: Router,
                private imageCropService: ImageCropModalService,
                private authService: AuthService) {
        this.identity = this.authService.getCurrentUser();
    }

    ngOnInit() {
        this.course_subscription = this.courseService.current_working_course.subscribe((course: Course) => {
            this.course = course;
        });
        this.courseService.changeCurrentEditTab('details');
        this.picture_subscription = this.imageCropService.avatar_changed.subscribe((res: ImageCropped) => {
            if (res && res.type == 'thumbnail') this.course.thumbnail.src = res.base64
            if (res && res.type == 'cover') this.course.featured_background.src = res.base64;
        })
    }

    ngOnDestroy() {
        this.imageCropService.cropperDisable();
        this.course_subscription.unsubscribe();
        this.picture_subscription.unsubscribe();
    }

    fileChangeEvent(event: any, type: string): void {
        if (event.target.value) this.imageCropService.openImageCropModal(event, type);
    }

    saveDetails() {
        this.spinner.showSpinner();
        this.courseService.updateCourseDetails(this.course.id, new Update_course_details_request().deserialize(this.course))
            .subscribe((response: Update_course_details_response) => {
                if (response.success) {
                    this.errors = new Update_course_details_errors();
                    this.courseService.getCourseDetails(this.course.id)
                        .subscribe((resp: Course) => {
                            this.spinner.hideSpinner();
                            this.courseService.changeCurrentWorkingCourse(resp);
                        });
                } else {
                    this.errors = response.errors;
                }
            });

    }

    deleteCourse() {
        this.courseService.deleteCourse(this.course.id)
            .subscribe((resp: Delete_course_response) => {
                if (resp.success) {
                    this.delete_errors = new Delete_course_errors();
                    this.router.navigate(['/profile/courses']);
                } else {
                    this.delete_errors = resp.errors;
                }
            });
    }

}
