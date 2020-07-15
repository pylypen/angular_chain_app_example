import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Courses_list} from '../courses/courses.model';
import {CoursesService} from '../courses/courses.service';
import {TeamsList} from '../teams/teams.model';
import {TeamsService} from '../teams/teams.service';
import {Injectable} from '@angular/core';
import {Identity} from '../../services/auth.identity.model';
import {AuthService} from '../../services/auth.service';
import {SettingsService} from '../settings/settings.service';
import {SettingsConfig} from '../settings/settings.model';
import {PeopleService} from '../people/people.service';
import {Course} from '../../shared/Course.model';
import {CourseService} from '../course/course.service';
import {LessonCommentsService} from '../course/lesson-comments.service';
import {Lesson_comments_response_data} from '../course/view/lesson/course-view-lesson.model';
import {LessonsService} from '../course/lessons.service';
import {StatisticsService} from '../statistics/statistics.service';
import {GlobalSpinnerService} from '../../spinner/global/global-spinner.service';
import {Account_settings} from '../settings/account-settings/account-settings.model';
import {Developer_account} from '../../shared/Developer_account.model';
import {Certificate} from 'crypto';
import {Statistics_courses_item} from '../statistics/statistics-courses/statistics-courses.model';
import {User} from '../../shared/User.model';


@Injectable()
export class CoursesListResolver implements Resolve<Courses_list> {
    constructor(private coursesService: CoursesService,
                private globalSpinner: GlobalSpinnerService) {
    }

    async resolve(): Promise<Courses_list> {
        try {
            let courses = await this.coursesService.getCoursesList().toPromise();
            return courses.data;
        } catch (err) {
            //  this.globalSpinner.hideSpinnerWithFeedback('Error. Something goes wrong. Please try again later');
            this.globalSpinner.hideSpinner();
            return err;
        }
    }
}


@Injectable()
export class TeamsListResolver implements Resolve<TeamsList> {

    constructor(private teamsService: TeamsService,
                private globalSpinner: GlobalSpinnerService) {
    }

    async resolve(): Promise<TeamsList> {
        try {
            let teams = await this.teamsService.getTeamsList().toPromise();
            return teams.data;
        } catch (err) {
            //  this.globalSpinner.hideSpinnerWithFeedback('Error. Something goes wrong. Please try again later');
            this.globalSpinner.hideSpinner();
            return err;
        }
    }
}


@Injectable()
export class IdentityResolver implements Resolve<Identity> {

    constructor(private authService: AuthService) {
    }

    resolve(): Identity {
        return this.authService.getCurrentUser();
    }
}


@Injectable()
export class SettingsResolver implements Resolve<SettingsConfig> {
    constructor(private settingsService: SettingsService,
                private globalSpinner: GlobalSpinnerService,) {
    }

    async resolve(): Promise<SettingsConfig> {
        try {
            let config = await this.settingsService.getSettingsConfig().toPromise();
            return config;
        } catch (err) {
            //  this.globalSpinner.hideSpinnerWithFeedback('Error. Something goes wrong. Please try again later');
            this.globalSpinner.hideSpinner();
            return err;
        }

    }

}


@Injectable()
export class PeopleListResolver implements Resolve<Array<User>> {
    constructor(private peopleService: PeopleService,
                private globalSpinner: GlobalSpinnerService) {
    }

    async resolve(): Promise<Array<User>> {
        try {
            let people = await this.peopleService.getPeopleList().toPromise();
            return people.data;
        } catch (err) {
            //  this.globalSpinner.hideSpinnerWithFeedback('Error. Something goes wrong. Please try again later');
            this.globalSpinner.hideSpinner();
            return err;
        }

    }
}


@Injectable()
export class GetCourseDetailsResolver implements Resolve<Course> {
    constructor(private courseService: CourseService,
                private globalSpinner: GlobalSpinnerService) {
    }

    async resolve(route: ActivatedRouteSnapshot): Promise<Course> {
        try {
            let course = await this.courseService.getCourseDetails(route.params['course_id']).toPromise();
            this.courseService.changeCurrentWorkingCourse(course);
            return course;
        } catch (err) {
            //  this.globalSpinner.hideSpinnerWithFeedback('Error. Something goes wrong. Please try again later');
            this.globalSpinner.hideSpinner();
            return err;
        }

    }
}


@Injectable()
export class GetLessonCommentsResolver implements Resolve<Lesson_comments_response_data> {
    constructor(private lessonCommentsService: LessonCommentsService,
                private lessonService: LessonsService,
                private globalSpinner: GlobalSpinnerService) {
    }

    async resolve(route: ActivatedRouteSnapshot): Promise<Lesson_comments_response_data> {
        try {
            let lesson = await this.lessonService.getLesson(route.params['lesson_id']).toPromise();
            if (lesson.data.allow_comments) {
                let comments = await this.lessonCommentsService.getLessonComments(route.params['lesson_id']).toPromise();
                if (lesson.data.allow_comments) return comments.data;
            }
        } catch (err) {
            //  this.globalSpinner.hideSpinnerWithFeedback('Error. Something goes wrong. Please try again later');
            this.globalSpinner.hideSpinner();
            return err;
        }
    }
}


@Injectable()
export class GetStatisticsCoursesResolver implements Resolve<Array<Statistics_courses_item>> {
    constructor(private statisticsService: StatisticsService,
                private globalSpinner: GlobalSpinnerService) {
    }

    async resolve(): Promise<Array<Statistics_courses_item>> {
        try {
            let stat_courses = await this.statisticsService.getStatisticsCourses().toPromise();
            return stat_courses.data;
        } catch (err) {
            //  this.globalSpinner.hideSpinnerWithFeedback('Error. Something goes wrong. Please try again later');
            this.globalSpinner.hideSpinner();
            return err;
        }

    }
}


@Injectable()
export class GetCertificatesResolver implements Resolve<Array<Certificate>> {

    constructor(private settingsService: SettingsService,
                private globalSpinner: GlobalSpinnerService) {
    }

    async resolve(): Promise<Array<Certificate>> {
        try {
            let certs = await this.settingsService.getCertificates().toPromise();
            return certs.data;
        } catch (err) {
            //  this.globalSpinner.hideSpinnerWithFeedback('Error. Something goes wrong. Please try again later');
            this.globalSpinner.hideSpinner();
            return err;
        }
    }
}


@Injectable()
export class GetDevelopersAccountsResolver implements Resolve<Array<Developer_account>> {
    constructor(private settingsService: SettingsService,
                private globalSpinner: GlobalSpinnerService,) {
    }

    async resolve(): Promise<Array<Developer_account>> {
        try {
            let dev_accs = await this.settingsService.getDevelopersAccsSettings().toPromise();
            return dev_accs.data;
        } catch (err) {
            //  this.globalSpinner.hideSpinnerWithFeedback('Error. Something goes wrong. Please try again later');
            this.globalSpinner.hideSpinner();
            return err;
        }
    }
}


@Injectable()
export class PersonalInfoResolver implements Resolve<SettingsConfig> {
    constructor(private settingsService: SettingsService,
                private globalSpinner: GlobalSpinnerService) {
    }

    async resolve(): Promise<SettingsConfig> {
        try {
            let personal_info = await this.settingsService.getPersonalInfo().toPromise();
            return personal_info.data;
        } catch (err) {
            //  this.globalSpinner.hideSpinnerWithFeedback('Error. Something goes wrong. Please try again later');
            this.globalSpinner.hideSpinner();
            return err;
        }
    }
}


@Injectable()
export class AccountSettingsResolver implements Resolve<Account_settings> {
    constructor(private settingsService: SettingsService,
                private globalSpinner: GlobalSpinnerService) {
    }

    async resolve(): Promise<Account_settings> {
        try {
            let acc_settings = await this.settingsService.getAccountSettings().toPromise();
            return acc_settings.data;
        } catch (err) {
            //  this.globalSpinner.hideSpinnerWithFeedback('Error. Something goes wrong. Please try again later');
            this.globalSpinner.hideSpinner();
            return err;
        }
    }

}
