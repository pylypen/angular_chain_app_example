import {Serializable} from "../../shared/Serializeble.interface";
import {Field_error} from "../../shared/Field_error.model";
import {Secret_question} from "../../shared/Secret_question";

export class Forgot_password_request implements Serializable<Forgot_password_request> {
    public email: string = '';
    public answer: string = '';

    deserialize(input: any) {
        if (input) {
            this.email = input.email;
            this.answer = input.answer;
        }
        return this;
    }
}

export class Forgot_password_errors implements Serializable<Forgot_password_errors> {
    public email: Field_error = new Field_error();
    public answer: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.email = new Field_error().deserialize(input.email);
            this.answer = new Field_error().deserialize(input.answer);
        }
        return this;
    }
}

export class Forgot_password_response implements Serializable<Forgot_password_response> {
    public success: boolean = false;
    public data: any;
    public errors: Forgot_password_errors = new Forgot_password_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = input.data;
            this.errors = new Forgot_password_errors().deserialize(input.errors);
        }
        return this;
    }
}

export class Get_question_errors implements Serializable<Get_question_errors> {
    public email: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.email = new Field_error().deserialize(input.email);
        }
        return this;
    }
}

export class Get_question_response implements Serializable<Get_question_response> {
    public success: boolean = false;
    public data: Secret_question = new Secret_question();
    public errors: Get_question_errors = new Get_question_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Secret_question().deserialize(input.data);
            this.errors = new Get_question_errors().deserialize(input.errors);
        }
        return this;
    }
}