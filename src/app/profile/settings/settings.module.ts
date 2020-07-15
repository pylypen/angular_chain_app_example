import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AngularSvgIconModule} from 'angular-svg-icon';


import {
    MatCardModule,
    MatDatepickerModule, MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSidenavModule, MatTableModule,
    MatRippleModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
} from "@angular/material";

import {SettingsComponent} from "./settings.component";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ChatMessagesComponent} from "./chat-messages/chat-messages.component";
import {NotificationsComponent} from "./notifications/notifications.component";
import {PersonalInformationComponent} from "./personal-information/personal-information.component";
import {CertificatesComponent} from "./certificates/certificates.component";
import {SettingsService} from "./settings.service";
import {FileUploadModule} from "ng2-file-upload";
import {DevelopersAccountsComponent} from "./developers-accounts/developers-accounts.component";
import { ImageCropModalComponent } from './image-crop-modal/image-crop.modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropModalService } from './image-crop-modal/image-crop.modal.service';



@NgModule({
    imports: [
        AngularSvgIconModule,
        MatInputModule,
        MatCardModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatChipsModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatDialogModule,
        CommonModule,
        MatTooltipModule,
        FormsModule,
        FileUploadModule,
        RouterModule,
        MatRippleModule,
        ImageCropperModule,
    ],
    declarations: [
        SettingsComponent,
        AccountSettingsComponent,
        ChangePasswordComponent,
        ChatMessagesComponent,
        NotificationsComponent,
        PersonalInformationComponent,
        CertificatesComponent,
        DevelopersAccountsComponent,
        ImageCropModalComponent,
    ],
    entryComponents: [
        ImageCropModalComponent
    ],
    providers: [
        SettingsService,
        ImageCropModalService,
    ]
})

export class SettingsModule {

}
