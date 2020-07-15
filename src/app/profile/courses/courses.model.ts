import {Serializable} from "../../shared/Serializeble.interface";
import {Course} from "../../shared/Course.model";

export class Courses_list implements Serializable<Courses_list> {
    public assigned: Array<Course> = [];
    public authoring: Array<Course> = [];
    public managing: Array<Course> = [];
    public team_assignment: Array<Course> = [];
    deserialize(input: any) {
        if (input) {
            if (input.assigned.length) {
                let assigned: Course;
                for (let i in input.assigned) {
                    assigned = new Course().deserialize(input.assigned[i]);
                    this.assigned.push(assigned);
                }
            }
            if (input.authoring.length) {
                let authoring: Course;
                for (let i in input.authoring) {
                    authoring = new Course().deserialize(input.authoring[i]);
                    this.authoring.push(authoring);
                }
            }
            if (input.managing.length) {
                let managing: Course;
                for (let i in input.managing) {
                    managing = new Course().deserialize(input.managing[i]);
                    this.managing.push(managing);
                }
            }

            if (input.team_assignment.length) {
                let team_assignment: Course;
                for (let i in input.team_assignment) {
                    team_assignment = new Course().deserialize(input.team_assignment[i]);
                    this.team_assignment.push(team_assignment);
                }
            }
        }
        return this;
    }
}

export class Get_courses_list_response implements Serializable<Get_courses_list_response> {
    public success: boolean = false;
    public data: Courses_list = new Courses_list();
    public error: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Courses_list().deserialize(input.data);
        }
        return this;
    }
}


export class Get_courses_snapshot_response implements Serializable<Get_courses_snapshot_response> {
    public success: boolean = false;
    public data: any;
    public error: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = input.data;
        }
        return this;
    }
}