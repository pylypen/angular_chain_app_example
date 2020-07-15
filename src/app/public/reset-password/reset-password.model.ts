import {Serializable} from "../../shared/Serializeble.interface";
import {Field_error} from "../../shared/Field_error.model";

export class Reset_password_request implements Serializable<Reset_password_request> {
    public token: string = '';
    public email: string = '';
    public password: string = '';
    public password_confirmation: string = '';

    deserialize(input: any) {
        if (input) {
            this.token = input.token;
            this.email = input.email;
            this.password = input.password;
            this.password_confirmation = input.password_confirmation;
        }
        return this;
    }
}

export class Reset_password_errors implements Serializable<Reset_password_errors> {
    public token: Field_error = new Field_error();
    public email: Field_error = new Field_error();
    public password: Field_error = new Field_error();
    public password_confirmation: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.token = new Field_error().deserialize(input.token);
            this.email = new Field_error().deserialize(input.email);
            this.password = new Field_error().deserialize(input.password);
            this.password_confirmation = new Field_error().deserialize(input.password_confirmation);
        }
        return this;
    }
}

export class Reset_password_response implements Serializable<Reset_password_response> {
    public success: boolean = false;
    public data: any;
    public errors: Reset_password_errors = new Reset_password_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = input.data;
            this.errors = new Reset_password_errors().deserialize(input.errors);
        }
        return this;
    }
}