import {Component, OnInit} from "@angular/core";
import {StatisticsService} from "../statistics.service";
import {Identity} from "../../../services/auth.identity.model";
import { Statistics_courses_item} from "./statistics-courses.model";
import {MatTableDataSource} from "@angular/material";
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './statistics-courses.component.html'
})
export class StatisticsCoursesComponent implements OnInit {

    identity: Identity = new Identity();

    stat_courses_ds = new MatTableDataSource<Statistics_courses_item>();
    stat_courses: Array<Statistics_courses_item> = [];

    displayedColumns: Array<string> = ['csv','course', 'assigned_users', 'started_users', 'completed_users', 'actions'];

    constructor(
        private activeRoute: ActivatedRoute,
        private statisticsService: StatisticsService) {}

    ngOnInit() {
        this.identity = this.activeRoute.snapshot.data['identity'];
        this.statisticsService.changeCurrentStatisticsTab('courses');
        this.stat_courses = this.activeRoute.snapshot.data['courses'];
        this.stat_courses_ds = new MatTableDataSource<Statistics_courses_item>(this.stat_courses);
    }


    downloadFile(course: any): void{
        this.statisticsService.getCSVfile(course.id).subscribe((data) => {
            const blob = new Blob([data], {type: 'text/csv'})
            const url = window.URL.createObjectURL(blob);
            this.downloadEmit(course.name, url);
        });
    }

    downloadEmit(filename: string, url: string): void{
        let a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.csv`;
        document.body.appendChild(a);
        a.click();
        document.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}