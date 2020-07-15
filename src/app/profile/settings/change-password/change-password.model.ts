import {Serializable} from "../../../shared/Serializeble.interface";
import {Field_error} from "../../../shared/Field_error.model";

export class Change_password implements Serializable<Change_password> {
    public password: string = '';
    public new_password: string = '';
    public new_password_confirmation: string = '';

    deserialize(input: any) {
        if (input) {
            this.password = input.password;
            this.new_password = input.new_password;
            this.new_password_confirmation = input.new_password_confirmation;

            return this;
        }
    }
}

export class Change_password_errors implements Serializable<Change_password_errors> {
    public password: Field_error = new Field_error();
    public new_password: Field_error = new Field_error();
    public new_password_confirmation: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.password = new Field_error().deserialize(input.password);
            this.new_password = new Field_error().deserialize(input.new_password);
            this.new_password_confirmation = new Field_error().deserialize(input.new_password_confirmation);

            return this;
        }
    }
}

export class Change_password_submit_response implements Serializable<Change_password_submit_response> {
    public success: boolean = false;
    public data: Change_password = new Change_password();
    public errors: Change_password_errors = new Change_password_errors();

    deserialize(input: any) {
        this.success = input.success;
        this.data = new Change_password().deserialize(input.data);
        this.errors = new Change_password_errors().deserialize(input.errors);

        return this;
    }


}