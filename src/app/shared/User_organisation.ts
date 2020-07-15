import {Serializable} from "./Serializeble.interface";

export class User_organisation implements Serializable<User_organisation> {
    public user_id: number = null;
    public is_admin: number = 0;
    public is_owner: number = 0;

    deserialize(input: any) {
        if (input) {
            this.user_id = input.user_id;
            this.is_admin = input.is_admin;
            this.is_owner = input.is_owner;
        }
        return this;
    }
}