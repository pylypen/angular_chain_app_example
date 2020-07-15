import {Serializable} from "./Serializeble.interface";
import {Lesson_progress_status} from "./Lesson_progress_status.model";

export class Lesson_progress implements Serializable<Lesson_progress> {
    public user_id: number = 0;
    public course_id: number = 0;
    public lesson_id: number = 0;

    public progress_status: Lesson_progress_status = new Lesson_progress_status();

    deserialize(input: any) {
        if (input) {
            this.user_id = input.user_id;
            this.course_id = input.course_id;
            this.lesson_id = input.lesson_id;
            this.progress_status = new Lesson_progress_status().deserialize(input.progress_status);
        }

        return this;
    }
}