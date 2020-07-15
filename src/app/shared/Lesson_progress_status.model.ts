import {Serializable} from "./Serializeble.interface";

export class Lesson_progress_status implements Serializable<Lesson_progress_status> {
    public id: number = 1;
    public name: string = 'Assigned';
    public percent: number = 0;


    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.name = input.name;
            this.percent = input.percent;
        }
        return this;
    }
}