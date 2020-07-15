import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./profile.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PageNotFoundComponent} from "../error/page-not-found/page-not-found.component";
import {AuthGuard} from "./services/auth-guard.service";
import {CoursesComponent} from "./courses/courses.component";
import {TeamsComponent} from "./teams/teams.component";
import {CourseViewComponent} from "./course/view/course-view.component";
import {CourseEditComponent} from "./course/edit/course-edit.component";
import {SettingsComponent} from "./settings/settings.component";
import {AccountSettingsComponent} from "./settings/account-settings/account-settings.component";
import {ChangePasswordComponent} from "./settings/change-password/change-password.component";
import {NotificationsComponent} from "./settings/notifications/notifications.component";
import {PersonalInformationComponent} from "./settings/personal-information/personal-information.component";
import {AccountSettingsGuard} from "./settings/account-settings/account-settings.guard";
import {CourseEditDetailsComponent} from "./course/edit/details/course-edit-details.component";
import {CourseEditCurriculumComponent} from "./course/edit/curriculum/course-edit-curriculum.component";
import {CourseComponent} from "./course/course.component";
import {CourseNewComponent} from "./course/new/course-new.component";
import {LessonListComponent} from "./course/edit/curriculum/lesson-list/lesson-list.component";
import {LessonEditComponent} from "./course/edit/curriculum/lesson-edit/lesson-edit.component";
import {LessonNewComponent} from "./course/edit/curriculum/lesson-new/lesson-new.component";
import {CourseEditPublishComponent} from "./course/edit/publish/course-edit-publish.component";
import {CourseViewListComponent} from "./course/view/list/course-view-list.component";
import {CourseViewLessonComponent} from "./course/view/lesson/course-view-lesson.component";
import {CourseManageComponent} from "./course/manage/course-manage.component";
import {CourseManageAssignComponent} from "./course/manage/assign/course-manage-assign.component";
import {CourseManageReviewComponent} from "./course/manage/review/course-manage-review.component";
import {RequestReviewComponent} from "./course/edit/publish/request-review/request-review.component";
import {PublishSettingsComponent} from "./course/edit/publish/publish-settings/publish-settings.component";
import {CoursePreviewComponent} from "./course/preview/course-preview.component";
import {PeopleComponent} from "./people/people.component";
import {CourseManageProgressComponent} from "./course/manage/progress/course-manage-progress.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {StatisticsCoursesComponent} from "./statistics/statistics-courses/statistics-courses.component";
import {CertificatesComponent} from "./settings/certificates/certificates.component";
import {DevelopersAccountsComponent} from "./settings/developers-accounts/developers-accounts.component";
import {DevelopersAccountsGuard} from "./settings/developers-accounts/developers-accounts.guard";
import {
    IdentityResolver,
    SettingsResolver,
    CoursesListResolver,
    TeamsListResolver,
    PeopleListResolver,
    GetStatisticsCoursesResolver,
    GetCertificatesResolver,
    PersonalInfoResolver,
    GetDevelopersAccountsResolver,
    AccountSettingsResolver,
    GetCourseDetailsResolver
} from './resolvers/profile.resolver';

const profileRoutes: Routes = [
        {
            path: 'profile',
            canActivate: [AuthGuard],
            component: ProfileComponent,
            children: [
                {path: '', redirectTo: '/profile/dashboard', pathMatch: 'full'},

                {
                    path: 'dashboard', component: DashboardComponent,
                    resolve: {
                        identity: IdentityResolver,
                        config: SettingsResolver,
                        courses: CoursesListResolver,
                        teams: TeamsListResolver
                    }
                },
                {
                    path: 'course', component: CourseComponent,
                    resolve: {
                        identity: IdentityResolver,
                        courses: CoursesListResolver,
                        teams: TeamsListResolver
                    },
                    children: [
                        {path: '', redirectTo: '/profile/courses', pathMatch: 'full'},

                        {path: 'new', component: CourseNewComponent}, // Resolver doesnt need

                        {
                            path: ':course_id/preview',
                            component: CoursePreviewComponent,
                            resolve: {
                                identity: IdentityResolver,
                                course: GetCourseDetailsResolver,
                            }
                        },
                        {
                            path: ':course_id/view',
                            //  canActivate: [/*todo: Check if user can view course*/],
                            component: CourseViewComponent,
                            resolve: {
                                course: GetCourseDetailsResolver,
                            },
                            children: [
                                {
                                    path: '', component: CourseViewListComponent,
                                    resolve: {
                                        identity: IdentityResolver
                                    }
                                },
                                {
                                    path: 'lesson/:lesson_id',
                                    component: CourseViewLessonComponent
                                }, // TODO : RESOLVER


                                {path: '**', component: PageNotFoundComponent}
                            ]
                        },
                        {
                            path: ':course_id/manage',
                            // canActivate: [/*todo: Check if user can manage course*/],
                            component: CourseManageComponent,
                            children: [
                                {path: '', redirectTo: 'assign', pathMatch: 'full'},
                                {path: 'assign', component: CourseManageAssignComponent},
                                {path: 'review', component: CourseManageReviewComponent},
                                {path: 'progress', component: CourseManageProgressComponent},

                                {path: '**', component: PageNotFoundComponent}
                            ]
                        },
                        {
                            path: ':course_id/edit',
                            //  canActivate: [/*todo: Check if user can edit course*/],
                            component: CourseEditComponent,
                            resolve: {
                                course: GetCourseDetailsResolver,
                            },
                            children: [
                                {path: '', redirectTo: 'details', pathMatch: 'full'},

                                {path: 'details', component: CourseEditDetailsComponent},
                                {
                                    path: 'publish', component: CourseEditPublishComponent,
                                    children: [
                                        {path: '', redirectTo: 'request-review', pathMatch: 'full'},
                                        {path: 'request-review', component: RequestReviewComponent},
                                        {path: 'publish-settings', component: PublishSettingsComponent},

                                        {path: '**', component: PageNotFoundComponent}
                                    ]
                                },
                                {
                                    path: 'curriculum', component: CourseEditCurriculumComponent,
                                    children: [
                                        {path: '', component: LessonListComponent},
                                        {path: 'lesson/:lesson_id/edit', component: LessonEditComponent},
                                        {path: 'lesson/new', component: LessonNewComponent},

                                        {path: '**', component: PageNotFoundComponent}
                                    ]
                                },

                                {path: '**', component: PageNotFoundComponent}
                            ]
                        },

                        {path: '**', component: PageNotFoundComponent}
                    ]
                },

                {
                    path: 'courses', component: CoursesComponent, resolve: {
                        identity: IdentityResolver,
                        courses: CoursesListResolver,
                        teams: TeamsListResolver
                    }
                },
                {
                    path: 'teams', component: TeamsComponent, resolve: {
                        teams: TeamsListResolver,
                        identity: IdentityResolver,
                        people: PeopleListResolver
                    }
                },

                {
                    path: 'settings',
                    component: SettingsComponent,
                    resolve: {
                        teams: TeamsListResolver,
                        identity: IdentityResolver,
                        config: SettingsResolver,
                    },
                    children: [
                        {path: '', redirectTo: '/profile/settings/personal-information', pathMatch: 'full'},
                        {
                            path: 'account-settings',
                            canActivate: [AccountSettingsGuard],
                            component: AccountSettingsComponent,
                            resolve: {
                                identity: IdentityResolver,
                                settings: AccountSettingsResolver
                            }
                        },
                        {
                            path: 'developers-accounts',
                            canActivate: [DevelopersAccountsGuard],
                            component: DevelopersAccountsComponent,
                            resolve: {dev_accs: GetDevelopersAccountsResolver}
                        },
                        {path: 'change-password', component: ChangePasswordComponent},

                        {path: 'notifications', component: NotificationsComponent},
                        {
                            path: 'personal-information', component: PersonalInformationComponent,
                            resolve: {
                                identity: IdentityResolver,
                                personal_info: PersonalInfoResolver
                            }
                        },
                        {
                            path: 'certificates', component: CertificatesComponent,
                            resolve: {
                                certificates: GetCertificatesResolver
                            }
                        },

                        {path: '**', redirectTo: '/profile/not-found', pathMatch: 'full'}
                    ]
                },

                {
                    path: 'people', component: PeopleComponent,
                    resolve: {
                        teams: TeamsListResolver,
                        identity: IdentityResolver,
                        people: PeopleListResolver,
                        config: SettingsResolver,
                    }
                },

                {
                    path: 'statistics', component: StatisticsComponent,
                    resolve: {
                        teams: TeamsListResolver,
                        identity: IdentityResolver,
                    }, children: [
                        {path: '', redirectTo: 'courses', pathMatch: 'full'},
                        {
                            path: 'courses', component: StatisticsCoursesComponent,
                            resolve: {
                                identity: IdentityResolver,
                                courses: GetStatisticsCoursesResolver,
                            }
                        },

                        {path: '**', redirectTo: '/profile/not-found', pathMatch: 'full'}
                    ]
                },
                {path: 'not-found', component: PageNotFoundComponent},

                {path: '**', redirectTo: '/profile/not-found', pathMatch: 'full'}
            ]
        }
    ]
;

@NgModule({
    imports: [
        RouterModule.forChild(profileRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileRoutingModule {
}
