import {Serializable} from "../../shared/Serializeble.interface";
import {Course} from "../../shared/Course.model";
import {Field_error} from "../../shared/Field_error.model";

export class Get_course_details_response implements Serializable<Get_course_details_response> {
    public success: boolean = false;
    public data: Course = new Course();
    public errors: Array<any> = [];

    deserialize(input: any) {
        
        if (input) {
            this.success = input.success;
            this.data = new Course().deserialize(input.data);
        }
        return this;
    }

}

export class Course_details_errors implements Serializable<Course_details_errors> {
    public name: Field_error = new Field_error();
    public subtitle: Field_error = new Field_error();
    public description: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.name = new Field_error().deserialize(input.name);
            this.subtitle = new Field_error().deserialize(input.subtitle);
            this.description = new Field_error().deserialize(input.description);
        }
        return this;
    }
}