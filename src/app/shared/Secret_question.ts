import {Serializable} from "./Serializeble.interface";

export class Secret_question implements Serializable<Secret_question> {
    public id: number = null;
    public question: string = '';

    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.question = input.question;
        }
        return this;
    }
}