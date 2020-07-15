import {Serializable} from "../../shared/Serializeble.interface";
import {Field_error} from "../../shared/Field_error.model";

export class Email_cert_request implements Serializable<Email_cert_request> {
    public course_id: number = 0;
    public email: string = '';

    deserialize(input: any) {
        if (input) {
            this.course_id = input.course_id;
            this.email = input.email;
        }
        return this;
    }
}

export class Email_cert_errors implements Serializable<Email_cert_errors> {
    public email: Field_error = new Field_error();
    public course_id: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.course_id = new Field_error().deserialize(input.course_id);
            this.email = new Field_error().deserialize(input.email);
        }
        return this;
    }
}

export class Email_cert_response implements Serializable<Email_cert_response> {
    public success: boolean = false;
    public data: string = '';
    public errors: Email_cert_errors = new Email_cert_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = input.data;
            this.errors = new Email_cert_errors().deserialize(input.errors);
        }
        return this;
    }
}