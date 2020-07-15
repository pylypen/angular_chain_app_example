import {Component, OnInit} from "@angular/core";
import {CourseService} from "../../course.service";

@Component({
    templateUrl: './course-edit-curriculum.component.html'
})
export class CourseEditCurriculumComponent implements OnInit {

    constructor(private courseService: CourseService) {

    }

    ngOnInit() {
        this.courseService.changeCurrentEditTab('curriculum');
    }

}
