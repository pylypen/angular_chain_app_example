import {Component, Inject} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { LogoImageCropperSettings, CoverImageCropperSettings, ThumbnailImageCropperSettings, ImageCropped } from "../../../shared/Image_cropper_default.model";
import { GlobalSpinnerService } from 'src/app/spinner/global/global-spinner.service';


@Component({
    templateUrl: './image-crop.modal.component.html'
})

export class ImageCropModalComponent {


    croppedImage: string;
    cropper_settings: LogoImageCropperSettings | CoverImageCropperSettings | ThumbnailImageCropperSettings;
    cropper_response: ImageCropped = new ImageCropped();

    constructor(
        public matDialogRef: MatDialogRef<ImageCropModalComponent>,
        @Inject(MAT_DIALOG_DATA) public imageChangedEvent: any,
        private globalSpinner: GlobalSpinnerService) {
        switch(this.imageChangedEvent.type){
            case 'avatar':
                this.cropper_settings = new LogoImageCropperSettings();
                break;
            case 'cover':
                this.cropper_settings = new CoverImageCropperSettings();
                break;
            case 'thumbnail':
                this.cropper_settings = new ThumbnailImageCropperSettings();
                break;
        }
    }


    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }

    loadImageFailed() {
        this.matDialogRef.close('');
        this.globalSpinner.hideSpinnerWithFeedback('Oops, that didn\'t work. The file type may be unsupported.');
    }


    close(){
        this.cropper_response.type = this.imageChangedEvent.type;
        this.cropper_response.base64 = this.croppedImage;
        this.matDialogRef.close(this.cropper_response);
    }


}
