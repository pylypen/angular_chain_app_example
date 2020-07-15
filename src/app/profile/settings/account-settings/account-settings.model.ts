import {Serializable} from "../../../shared/Serializeble.interface";
import {Field_error} from "../../../shared/Field_error.model";
import {Media_file} from "../../../shared/Media_file.model";

export class Account_settings implements Serializable<Account_settings> {
    public email: string = '';
    public name: string = '';
    public phone_number: string = '';
    public state: string = '';
    public city: string = '';
    public street: string = '';
    public zip: string = '';
    public logo: Media_file = new Media_file();
    public cover_picture: Media_file = new Media_file();

    deserialize(input: any) {
        if (input) {
            this.email = input.email;
            this.name = input.name;
            this.phone_number = input.phone_number;
            this.state = input.state;
            this.city = input.city;
            this.street = input.street;
            this.zip = input.zip;
            this.logo = new Media_file().deserialize(input.logo);
            this.cover_picture = new Media_file().deserialize(input.cover_picture);
        }
        return this;
    }
}

export class Account_settings_errors implements Serializable<Account_settings_errors> {
    public email: Field_error = new Field_error();
    public name: Field_error = new Field_error();
    public phone_number: Field_error = new Field_error();
    public state: Field_error = new Field_error();
    public city: Field_error = new Field_error();
    public street: Field_error = new Field_error();
    public zip: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.email = new Field_error().deserialize(input.email);
            this.name = new Field_error().deserialize(input.name);
            this.phone_number = new Field_error().deserialize(input.phone_number);
            this.state = new Field_error().deserialize(input.state);
            this.city = new Field_error().deserialize(input.city);
            this.street = new Field_error().deserialize(input.street);
            this.zip = new Field_error().deserialize(input.zip);
        }
        return this;
    }
}

export class Account_settings_response implements Serializable<Account_settings_response> {
    public success: boolean = false;
    public data: Account_settings = new Account_settings();
    public errors: Account_settings_errors = new Account_settings_errors();

    deserialize(input: any) {
        this.success = input.success;
        this.data = new Account_settings().deserialize(input.data);
        this.errors = new Account_settings_errors().deserialize(input.errors);

        return this;
    }
}

export class Update_logo_errors implements Serializable<Update_logo_errors> {
    public logo: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.logo = new Field_error().deserialize(input.logo);
        }
        return this;
    }
}

export class Update_logo_response implements Serializable<Update_logo_response> {
    public success: boolean = false;
    public data: Media_file = new Media_file();
    public errors: Update_logo_errors = new Update_logo_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Media_file().deserialize(input.data);
            this.errors = new Update_logo_errors().deserialize(input.errors);
        }
        return this;
    }
}

export class Update_cover_pic_errors implements Serializable<Update_cover_pic_errors> {
    public cover_picture: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.cover_picture = new Field_error().deserialize(input.cover_picture);
        }
        return this;
    }
}

export class Update_cover_pic_response implements Serializable<Update_cover_pic_response> {
    public success: boolean = false;
    public data: Media_file = new Media_file();
    public errors: Update_cover_pic_errors = new Update_cover_pic_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Media_file().deserialize(input.data);
            this.errors = new Update_cover_pic_errors().deserialize(input.errors);
        }
        return this;
    }
}