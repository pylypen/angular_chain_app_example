import {Serializable} from "../../../shared/Serializeble.interface";
import {Course} from "../../../shared/Course.model";

export class Statistics_courses_item implements Serializable<Statistics_courses_item> {
    public course: Course = new Course();
    public assigned: number = 0;
    public started: number = 0;
    public completed: number = 0;

    deserialize(input: any) {
        if (input) {
            this.course = new Course().deserialize(input.course);
            this.assigned = input.assigned;
            this.started = input.started;
            this.completed = input.completed;
        }
        return this;
    }

}

export class Get_statistics_course_response implements Serializable<Get_statistics_course_response> {
    public success: boolean = false;
    public data: Array<Statistics_courses_item> = [];
    public error: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;

            if (input.data.length) {
                let stat: Statistics_courses_item;
                for (let i in input.data) {
                    stat = new Statistics_courses_item().deserialize(input.data[i]);
                    this.data.push(stat);
                }
            }
        }
        return this;
    }
}

