import {Serializable} from "../../shared/Serializeble.interface";
import {User} from "../../shared/User.model";
import {Field_error} from "../../shared/Field_error.model";

export class Get_people_list_response implements Serializable<Get_people_list_response> {
    public success: boolean = false;
    public data: Array<User> = [];
    public errors: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.errors = input.errors;

            if (input.data.length) {
                let user: User;
                for (let i in input.data) {
                    user = new User().deserialize(input.data[i]);
                    this.data.push(user);
                }
            }
        }
        return this;
    }
}

export class People_update_profile_request implements Serializable<People_update_profile_request> {
    public contact_email: string;
    public first_name: string;
    public last_name: string;
    public birthday: string;
    public phone_number: string;

    deserialize(input: any) {
        if (input) {
            this.contact_email = input.contact_email;
            this.first_name = input.first_name;
            this.last_name = input.last_name;
            this.birthday = input.birthday;
            this.phone_number = input.phone_number;
        }

        return this;
    }
}

export class People_update_profile_errors implements Serializable<People_update_profile_errors> {
    public contact_email: Field_error = new Field_error();
    public first_name: Field_error = new Field_error();
    public last_name: Field_error = new Field_error();
    public birthday: Field_error = new Field_error();
    public phone_number: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.contact_email = new Field_error().deserialize(input.contact_email);
            this.first_name = new Field_error().deserialize(input.first_name);
            this.last_name = new Field_error().deserialize(input.last_name);
            this.birthday = new Field_error().deserialize(input.birthday);
            this.phone_number = new Field_error().deserialize(input.phone_number);
        }

        return this;
    }
}

export class People_update_profile_response implements Serializable<People_update_profile_response> {
    public success: boolean = false;
    public data: Array<User> = [];
    public errors: People_update_profile_errors = new People_update_profile_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.errors = new People_update_profile_errors().deserialize(input.errors);

            if (input.data.length) {
                let user: User;
                for (let i in input.data) {
                    user = new User().deserialize(input.data[i]);
                    this.data.push(user);
                }
            }
        }
        return this;
    }
}

export class People_create_profile_request implements Serializable<People_create_profile_request> {
    public email: string;
    public contact_email: string;
    public first_name: string;
    public last_name: string;
    public birthday: string;
    public phone_number: string;

    deserialize(input: any) {
        if (input) {
            this.email = input.email;
            this.contact_email = input.contact_email;
            this.first_name = input.first_name;
            this.last_name = input.last_name;
            this.birthday = input.birthday;
            this.phone_number = input.phone_number;
        }

        return this;
    }
}

export class People_create_profile_errors implements Serializable<People_create_profile_errors> {
    public email: Field_error = new Field_error();
    public contact_email: Field_error = new Field_error();
    public first_name: Field_error = new Field_error();
    public last_name: Field_error = new Field_error();
    public birthday: Field_error = new Field_error();
    public phone_number: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.email = new Field_error().deserialize(input.email);
            this.contact_email = new Field_error().deserialize(input.contact_email);
            this.first_name = new Field_error().deserialize(input.first_name);
            this.last_name = new Field_error().deserialize(input.last_name);
            this.birthday = new Field_error().deserialize(input.birthday);
            this.phone_number = new Field_error().deserialize(input.phone_number);
        }

        return this;
    }
}

export class People_create_profile_response implements Serializable<People_create_profile_response> {
    public success: boolean = false;
    public data: Array<User> = [];
    public errors: People_create_profile_errors = new People_create_profile_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.errors = new People_create_profile_errors().deserialize(input.errors);

            if (input.data.length) {
                let user: User;
                for (let i in input.data) {
                    user = new User().deserialize(input.data[i]);
                    this.data.push(user);
                }
            }
        }
        return this;
    }
}

export class People_reivite_errors implements Serializable<People_reivite_errors> {
    public user_id: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.user_id = new Field_error().deserialize(input.id);
        }
        return this;
    }
}

export class People_reinvite_response implements Serializable<People_reinvite_response>{

    public success: boolean = false;
    public data: any = null;
    public errors: People_reivite_errors = new People_reivite_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.errors = new People_reivite_errors().deserialize(input.errors);
        }
        return this;
    }

}
