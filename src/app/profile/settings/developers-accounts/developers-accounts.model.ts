import {Serializable} from "../../../shared/Serializeble.interface";
import {Field_error} from "../../../shared/Field_error.model";
import {Developer_account} from "../../../shared/Developer_account.model";

export class Get_developers_accs_response implements Serializable<Get_developers_accs_response> {
    public success: boolean = false;
    public data: Array<Developer_account> = [];
    public errors: any = [];

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.errors = input.errors;

            if (input.data.length) {
                let acc: Developer_account;
                for (let i in input.data) {
                    acc = new Developer_account().deserialize(input.data[i]);
                    this.data.push(acc);
                }
            }
        }
        return this;
    }
}

export class Acc_key_request implements Serializable<Acc_key_request> {
    public acc_key: string = '';

    deserialize(input: any) {
        if (input) {
            this.acc_key = input.acc_key;
        }
        return this;
    }
}

export class Acc_key_errors implements Serializable<Acc_key_errors> {
    public acc_key: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.acc_key = new Field_error().deserialize(input.acc_key)
        }
        return this;
    }
}

export class Acc_key_response implements Serializable<Acc_key_response> {
    public success: boolean = false;
    public errors: Acc_key_errors = new Acc_key_errors();

    deserialize(input: any) {
        this.success = input.success;
        this.errors = new Acc_key_errors().deserialize(input.errors);
        return this;
    }
}

