import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import {ProfileHeaderComponent} from "./header/profile-header.component";
import {MatSidenavModule, MatChipsModule} from "@angular/material";
import {MatGridListModule} from "@angular/material";
import {MatToolbarModule} from "@angular/material";
import {MatMenuModule} from "@angular/material";
import {MatIconModule} from "@angular/material";
import {MatDividerModule} from "@angular/material";
import {MatCardModule} from "@angular/material";
import {MatDialogModule} from "@angular/material";
import {MatProgressBarModule} from "@angular/material";
import {MatExpansionModule} from "@angular/material";
import {MatFormFieldModule} from "@angular/material";
import {MatButtonModule} from "@angular/material";
import {MatInputModule} from "@angular/material";
import {MatListModule} from "@angular/material";
import {AuthGuard} from "./services/auth-guard.service";
import {ProfileSidebarLeftComponent} from "./sidebar-left/profile-sidebar-left.component";
import {ProfileHttpInterceptService} from "./services/profile-http-intercept.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {DashboardModule} from "./dashboard/dashboard.module";
import {TeamsModule} from "./teams/teams.module";
import {CoursesModule} from "./courses/courses.module";
import {CourseModule} from "./course/course.module";
import {ProfileHeaderService} from "./header/profile-header.service";
import {ProfileSidebarLeftService} from "./sidebar-left/profile-sidebar-left.service";
import {Title} from "@angular/platform-browser";
import {SettingsModule} from "./settings/settings.module";
import {AccountSettingsGuard} from "./settings/account-settings/account-settings.guard";
import {IntercomModule} from "ng-intercom";
import {IntercomService} from "./intercom.service";
import {Environment} from "../../environments/environment";
import {PeopleModule} from "./people/people.module";
import {StatisticsModule} from "./statistics/statistics.module";
import {ProfileService} from "./profile.service";
import {EmailCertModalComponent} from "./email-cert-modal/email-cert.modal.component";
import {DevelopersAccountsGuard} from "./settings/developers-accounts/developers-accounts.guard";
import {
    CoursesListResolver,
    TeamsListResolver,
    IdentityResolver,
    SettingsResolver,
    PeopleListResolver,
    GetCourseDetailsResolver,
    GetLessonCommentsResolver,
    GetStatisticsCoursesResolver,
    GetCertificatesResolver,
    GetDevelopersAccountsResolver,
    PersonalInfoResolver,
    AccountSettingsResolver
} from "./resolvers/profile.resolver";
import { GlobalSpinnerModule } from '../spinner/global/global-spinner.module';
import { PageNotFoundModule } from '../error/page-not-found/page-not-found.module';
@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,

        // Material Modules //
        AngularSvgIconModule,
        MatSidenavModule,
        MatGridListModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatCardModule,
        MatDialogModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatListModule,
        FormsModule,
        MatChipsModule,
        ReactiveFormsModule,

        // Material modules end //

        // Pages modules //
        DashboardModule,
        CoursesModule,
        CourseModule,
        TeamsModule,
        SettingsModule,
        PeopleModule,
        StatisticsModule,
        PageNotFoundModule,
        GlobalSpinnerModule,
        // Pages modules end //


        // Intercom
        IntercomModule.forRoot({
            appId: Environment.intercomAppKey,
            updateOnRouterChange: true
        })
        // Intercom end
    ],
    declarations: [
        ProfileSidebarLeftComponent,
        ProfileComponent,
        ProfileHeaderComponent,
        EmailCertModalComponent
    ],
    entryComponents: [
        EmailCertModalComponent
    ],
    providers: [
        Title,{
            provide: HTTP_INTERCEPTORS,
            useClass: ProfileHttpInterceptService,
            multi: true
        },

        // Guards //

        AuthGuard,
        AccountSettingsGuard,
        DevelopersAccountsGuard,

        // Guards end //


        // Resolvers //

        CoursesListResolver,
        TeamsListResolver,
        IdentityResolver,
        SettingsResolver,
        PeopleListResolver,
        GetCourseDetailsResolver,
        GetLessonCommentsResolver,
        GetStatisticsCoursesResolver,
        GetCertificatesResolver,
        GetDevelopersAccountsResolver,
        PersonalInfoResolver,
        AccountSettingsResolver,
        // Resolvers end //

        // Services //

          ProfileService,
          ProfileHeaderService,
          ProfileSidebarLeftService,
          IntercomService

        // Services end //

    ]
})

export class ProfileModule {
}
