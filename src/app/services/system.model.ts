import {Serializable} from "../shared/Serializeble.interface";
import {Secret_question} from "../shared/Secret_question";

export class Get_secret_questions_response implements Serializable<Get_secret_questions_response> {
    public success: boolean = false;
    public data: Array<Secret_question> = [];
    public error: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;

            if (input.data.length) {
                let question: Secret_question;
                for (let i in input.data) {
                    question = new Secret_question().deserialize(input.data[i]);
                    this.data.push(question);
                }
            }
        }
        return this;
    }
}