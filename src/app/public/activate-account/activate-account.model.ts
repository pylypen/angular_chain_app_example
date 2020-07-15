import {Serializable} from "../../shared/Serializeble.interface";
import {Field_error} from "../../shared/Field_error.model";

export class Activate_account_request implements Serializable<Activate_account_request> {
    public confirm_code: string = '';
    public email: string = '';
    public first_name: string = '';
    public last_name: string = '';
    public password: string = '';
    public password_confirmation: string = '';

    deserialize(input: any) {
        if (input) {
            this.confirm_code = input.confirm_code;
            this.email = input.email;
            this.first_name = input.first_name;
            this.last_name = input.last_name;
            this.password = input.password;
            this.password_confirmation = input.password_confirmation;
        }
        return this;
    }
}

export class Activate_account_errors implements Serializable<Activate_account_errors> {
    public confirm_code: Field_error = new Field_error();
    public email: Field_error = new Field_error();
    public first_name: Field_error = new Field_error();
    public last_name: Field_error = new Field_error();
    public password: Field_error = new Field_error();
    public password_confirmation: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.confirm_code = new Field_error().deserialize(input.confirm_code);
            this.email = new Field_error().deserialize(input.email);
            this.first_name = new Field_error().deserialize(input.first_name);
            this.last_name = new Field_error().deserialize(input.last_name);
            this.password = new Field_error().deserialize(input.password);
            this.password_confirmation = new Field_error().deserialize(input.password_confirmation);
        }
        return this;
    }
}

export class Activate_account_response implements Serializable<Activate_account_response> {
    public success: boolean = false;
    public data: any;
    public errors: Activate_account_errors = new Activate_account_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = input.data;
            this.errors = new Activate_account_errors().deserialize(input.errors);
        }
        return this;
    }
}

export class Get_activate_account_data implements Serializable<Activate_account_response> {
    public success: boolean = false;
    public data: Activate_account_request = new Activate_account_request();
    public errors: Activate_account_errors = new Activate_account_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Activate_account_request().deserialize(input.data);
            this.errors = new Activate_account_errors().deserialize(input.errors);
        }
        return this;
    }
}