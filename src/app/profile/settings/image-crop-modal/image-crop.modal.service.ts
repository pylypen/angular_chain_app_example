import {Injectable} from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material";
import { ImageCropModalComponent } from "./image-crop.modal.component";
import { Default_modal_700_width } from "../../../shared/Modal.model";
import { BehaviorSubject, Observable } from "rxjs";
import { ImageCropped } from "../../../shared/Image_cropper_default.model";

@Injectable()

export class ImageCropModalService {

    private dialog_ref: MatDialogRef<ImageCropModalComponent>;
    private base64_source: BehaviorSubject<ImageCropped> = new BehaviorSubject(new ImageCropped());
    
    public avatar_changed: Observable<ImageCropped> = this.base64_source.asObservable();

    constructor(private dialog: MatDialog) {}


    fileChangeOpenModal(event: any, type: string): void { // types: 'avatar', 'cover', 'thumbnail'
        if(event.target.value) this.openImageCropModal(event, type);        
    }


    openImageCropModal(image: any, type: string) {
        let config: Default_modal_700_width = new Default_modal_700_width().deserialize({image: image, type: type});
        this.dialog_ref = this.dialog.open(ImageCropModalComponent, config);
        this.dialog_ref.afterClosed().subscribe((result: ImageCropped) => {
            if(result) this.base64_source.next(result);
        });
    }

    cropperDisable(){
        this.base64_source.next(new ImageCropped());
    }



}