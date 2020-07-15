import {Serializable} from "./Serializeble.interface";

export class Developer_account implements Serializable<Developer_account> {
    public acc_key: string = '';
    public issued_to: string = '';
    public email: string = '';
    public org_token_issued_at: Date = null;

    deserialize(input: any) {
        if (input) {
            this.acc_key = input.acc_key;
            this.issued_to = input.issued_to;
            this.email = input.email;
            this.org_token_issued_at = input.org_token_issued_at;
        }
        return this;
    }
}