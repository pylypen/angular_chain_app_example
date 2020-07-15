import {Component, OnInit, OnDestroy,} from "@angular/core";
import {SettingsService} from "../settings.service";
import {
    Personal_info, Update_personal_info_errors,
    Update_personal_info_response
} from "./personal-information.model";
import {Identity} from "../../../services/auth.identity.model";
import {AuthService} from "../../../services/auth.service";
import { ImageCropModalService } from '../image-crop-modal/image-crop.modal.service';
import { Subscription } from 'rxjs';
import { ImageCropped } from 'src/app/shared/Image_cropper_default.model';
import { ActivatedRoute } from '@angular/router';
@Component({
    templateUrl: './personal-information.component.html',
    styleUrls: ['../settings.scss'],
})

export class PersonalInformationComponent implements OnInit, OnDestroy {

    personal_info: Personal_info = new Personal_info();
    errors: Update_personal_info_errors = new Update_personal_info_errors();
    identity: Identity;

    private avatar_subscription: Subscription;

    constructor(
        private settingsService: SettingsService,
        private authService: AuthService,
        private activeRoute: ActivatedRoute,
        private imageCropService: ImageCropModalService) {
    }

    ngOnInit() {
        this.identity = this.activeRoute.snapshot.data['identity'];
        this.personal_info = this.activeRoute.snapshot.data['personal_info'];
        this.avatar_subscription = this.imageCropService.avatar_changed.subscribe((res: ImageCropped) => {
            if(res && res.type === 'avatar'){
                this.personal_info.avatar.src = res.base64;
                this.identity.user.avatar.src = res.base64;
            }
        })

    }

    ngOnDestroy(){
        this.imageCropService.cropperDisable();
        this.avatar_subscription.unsubscribe();
    }


    fileChangeEvent(event: any, type: string): void {
        if(event.target.value) this.imageCropService.openImageCropModal(event, type);
    }


    updatePersonalInfo() {
        this.settingsService.updatePersonalInfo(this.personal_info)
            .subscribe((result: Update_personal_info_response) => {
                this.errors = result.errors;
                if (result.success) {
                    this.identity.user.first_name = result.data.first_name;
                    this.identity.user.last_name = result.data.last_name;
                    this.authService.updateCurrentUser(this.identity);
                }
            })
    }

}
