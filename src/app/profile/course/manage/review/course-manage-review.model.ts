import {Serializable} from "../../../../shared/Serializeble.interface";
import {Course} from "../../../../shared/Course.model";

export class Get_managing_list_response implements Serializable<Get_managing_list_response> {
    public success: boolean = false;
    public data: Array<Course> = [];
    public errors: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.errors = input.errors;

            if (input.data.length) {
                let course: Course;
                for (let i in input.data) {
                    course = new Course().deserialize(input.data[i]);
                    this.data.push(course);
                }
            }
        }
        return this;
    }
}