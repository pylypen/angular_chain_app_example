import {Serializable} from "../../shared/Serializeble.interface";
import {Field_error} from "../../shared/Field_error.model";
import {Identity} from "../../services/auth.identity.model";

export class Login_request implements Serializable<Login_request> {
    public email: string = '';
    public password: string = '';

    deserialize(input: any) {
        if (input) {
            this.email = input.email;
            this.password = input.password;
        }
        return this;
    }
}

export class Login_errors implements Serializable<Login_errors> {
    public email: Field_error = new Field_error();
    public password: Field_error = new Field_error();
    public general: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.email = new Field_error().deserialize(input.email);
            this.password = new Field_error().deserialize(input.password);
        }
        return this;
    }
}

export class Login_response implements Serializable<Login_response> {
    public success: boolean = false;
    public data: Identity = new Identity();
    public errors: Login_errors = new Login_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Identity().deserialize(input.data);
            this.errors = new Login_errors().deserialize(input.errors);
        }
        return this;
    }
}