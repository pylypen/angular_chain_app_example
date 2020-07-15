import {Serializable} from '../../../shared/Serializeble.interface';
import {Field_error} from "../../../shared/Field_error.model";
import {Media_file} from "../../../shared/Media_file.model";

export class Personal_info implements Serializable<Personal_info> {
    public contact_email: string;
    public first_name: string;
    public last_name: string;
    public birthday: string;
    public phone_number: string;
    public avatar: Media_file = new Media_file();

    deserialize(input: any) {

        if (input) {
            this.contact_email = input.contact_email;
            this.first_name = input.first_name;
            this.last_name = input.last_name;
            this.birthday = input.birthday;
            this.phone_number = input.phone_number;
            this.avatar = new Media_file().deserialize(input.avatar);
        }

        return this;
    }
}

export class Update_personal_info_errors implements Serializable<Update_personal_info_errors> {
    public contact_email: Field_error = new Field_error();
    public first_name: Field_error = new Field_error();
    public last_name: Field_error = new Field_error();
    public birthday: Field_error = new Field_error();
    public phone_number: Field_error = new Field_error();
    public avatar: Field_error = new Field_error();

    deserialize(input: any) {

        if (input) {
            this.contact_email = new Field_error().deserialize(input.contact_email);
            this.first_name = new Field_error().deserialize(input.first_name);
            this.last_name = new Field_error().deserialize(input.last_name);
            this.birthday = new Field_error().deserialize(input.birthday);
            this.phone_number = new Field_error().deserialize(input.phone_number);
            this.avatar = new Field_error().deserialize(input.avatar);
        }

        return this;
    }
}

export class Get_personal_info_response implements Serializable<Get_personal_info_response> {
    public success: boolean = false;
    public data: Personal_info = new Personal_info();
    public errors: Update_personal_info_errors = new Update_personal_info_errors();

    deserialize(input: any) {

        this.success = input.success;
        this.data = new Personal_info().deserialize(input.data);

        return this;
    }
}

export class Update_personal_info_response implements Serializable<Update_personal_info_response> {
    public success: boolean = false;
    public data: Personal_info = new Personal_info();
    public errors: Update_personal_info_errors = new Update_personal_info_errors();

    deserialize(input: any) {

        this.success = input.success;
        this.data = new Personal_info().deserialize(input.data);
        this.errors = new Update_personal_info_errors().deserialize(input.errors);

        return this;
    }
}

export class Update_avatar_errors implements Serializable<Update_avatar_errors> {
    public avatar: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.avatar = new Field_error().deserialize(input.avatar);
        }
        return this;
    }
}

export class Update_avatar_response implements Serializable<Update_avatar_response> {
    public success: boolean = false;
    public data: Media_file = new Media_file();
    public errors: Update_avatar_errors = new Update_avatar_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Media_file().deserialize(input.data);
            this.errors = new Update_avatar_errors().deserialize(input.errors);
        }
        return this;
    }
}