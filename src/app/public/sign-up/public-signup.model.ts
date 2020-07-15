import {Serializable} from "../../shared/Serializeble.interface";
import {Field_error} from "../../shared/Field_error.model";
import {Identity} from "../../services/auth.identity.model";

export class SignUp_request implements Serializable<SignUp_request> {
    public email: string = '';
    public first_name: string = '';
    public last_name: string = '';

    deserialize(input: any) {
        if (input) {
            this.email = input.email;
            this.first_name = input.first_name;
            this.last_name = input.last_name;
        }
        return this;
    }
}

export class SignUp_erorrs implements Serializable<SignUp_erorrs> {
    public email: Field_error = new Field_error();
    public first_name: Field_error = new Field_error();
    public last_name: Field_error = new Field_error();
    public general: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.email = new Field_error().deserialize(input.email);
            this.first_name = new Field_error().deserialize(input.first_name);
            this.last_name = new Field_error().deserialize(input.last_name);
        }
        return this;
    }
}


export class SignUp_response implements Serializable<SignUp_response>{
    public success: boolean = false;
    public errors: SignUp_erorrs = new SignUp_erorrs();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.errors = new SignUp_erorrs().deserialize(input.errors);
        }
        return this;
    }
}


export class Create_Organisation_request implements Serializable<Create_Organisation_request> {
    public email: string = '';
    public first_name: string = '';
    public last_name: string = '';
    public org_name: string = '';

    deserialize(input: any) {
        if (input) {
            this.email = input.email;
            this.first_name = input.first_name;
            this.last_name = input.last_name;
            this.org_name = input.org_name;
        }
        return this;
    }
}


export class Create_Organisation_errors implements Serializable<Create_Organisation_errors> {
    public email: Field_error = new Field_error();
    public first_name: Field_error = new Field_error();
    public last_name: Field_error = new Field_error();
    public org_name: Field_error = new Field_error();
    public general: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.email = new Field_error().deserialize(input.email);
            this.first_name = new Field_error().deserialize(input.first_name);
            this.last_name = new Field_error().deserialize(input.last_name);
            this.org_name = new Field_error().deserialize(input.org_name);
        }
        return this;
    }
}


export class Create_Organisation_response implements Serializable<Create_Organisation_response>{
    public success: boolean = false;
    public data: Identity = new Identity();
    public errors: Create_Organisation_errors = new Create_Organisation_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Identity().deserialize(input.data);
            this.errors = new Create_Organisation_errors().deserialize(input.errors);
        }
        return this;
    }
}
