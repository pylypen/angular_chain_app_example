import {Serializable} from "../../../../../shared/Serializeble.interface";
import {Field_error} from "../../../../../shared/Field_error.model";
import {Lesson} from "../../../../../shared/Lesson.model";

export class Create_lesson_request implements Serializable<Create_lesson_request> {
    public course_id: number = null;
    public name: string = '';

    deserialize(input: any) {
        if (input) {
            this.course_id = input.course_id;
            this.name = input.name;
        }
        return this;
    }
}

export class Create_lesson_errors implements Serializable<Create_lesson_errors> {
    public lesson: Field_error = new Field_error();
    public name: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.lesson = new Field_error().deserialize(input.lesson);
            this.name = new Field_error().deserialize(input.name)
        }
        return this;
    }
}

export class Create_lesson_response implements Serializable<Create_lesson_response> {
    public success: boolean = false;
    public data: Lesson = new Lesson();
    public errors: Create_lesson_errors = new Create_lesson_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Lesson().deserialize(input.data);
            this.errors = new Create_lesson_errors().deserialize(input.errors);
        }
        return this;
    }
}