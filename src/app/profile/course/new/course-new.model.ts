import {Serializable} from "../../../shared/Serializeble.interface";
import {Field_error} from "../../../shared/Field_error.model";
import {Course} from "../../../shared/Course.model";

export class Create_course_request implements Serializable<Create_course_request> {
    public name: string = '';

    deserialize(input: any) {
        if (input) {
            this.name = input.name;
        }
        return this;
    }
}

export class Create_course_errors implements Serializable<Create_course_errors> {
    public name: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.name = new Field_error().deserialize(input.name);
        }
        return this;
    }
}

export class Create_course_response implements Serializable<Create_course_response> {
    public success: boolean = false;
    public data: Course = new Course;
    public errors: Create_course_errors = new Create_course_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Course().deserialize(input.data);
            this.errors = new Create_course_errors().deserialize(input.errors);
        }
        return this;
    }
}