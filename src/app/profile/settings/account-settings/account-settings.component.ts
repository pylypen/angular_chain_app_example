import {Component, OnInit, OnDestroy,} from "@angular/core";
import {SettingsService} from "../settings.service";
import {
    Account_settings, Account_settings_errors, Account_settings_response
} from "./account-settings.model";
import {Identity} from "../../../services/auth.identity.model";
import {AuthService} from "../../../services/auth.service";
import { Subscription } from 'rxjs';
import { ImageCropModalService } from '../image-crop-modal/image-crop.modal.service';
import { ImageCropped } from 'src/app/shared/Image_cropper_default.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './account-settings.component.html',
    styleUrls: ['../settings.scss'],
})

export class AccountSettingsComponent implements OnInit, OnDestroy {

    account_settings: Account_settings = new Account_settings();
    errors: Account_settings_errors = new Account_settings_errors();

    identity: Identity;

    private image_subscription: Subscription;

    constructor(private authService: AuthService,
                private activeRoute: ActivatedRoute,
                private imageCropService: ImageCropModalService,
                private settingsService: SettingsService) {}

    ngOnInit() {
        this.account_settings = this.activeRoute.snapshot.data['settings'];
        this.identity = this.activeRoute.snapshot.data['identity'];

        this.image_subscription = this.imageCropService.avatar_changed.subscribe((res: ImageCropped) => {
            if(res && res.type == 'cover') {
                this.account_settings.cover_picture.src = res.base64;
                this.identity.organisation.cover_picture.src = res.base64;
            } else if (res && res.type == 'avatar') {
                this.account_settings.logo.src = res.base64;
                this.identity.organisation.logo.src = res.base64;
            }
        });
    }

    ngOnDestroy(){
        this.imageCropService.cropperDisable();
        this.image_subscription.unsubscribe();
    }

    fileChangeEvent(event: any, type: string): void {
        if(event.target.value) this.imageCropService.openImageCropModal(event, type);
    }

    submit_account_settings() {
        this.settingsService.updateAccountSettings(this.account_settings)
            .subscribe((result: Account_settings_response) => {
                this.errors = result.errors;
                if (result.success) {
                    this.identity.organisation.name = result.data.name;
                    this.authService.updateCurrentUser(this.identity);
                }
            })
    }

}
