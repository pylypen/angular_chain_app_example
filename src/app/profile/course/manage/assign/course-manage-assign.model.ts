import {Serializable} from "../../../../shared/Serializeble.interface";
import {Marketplace} from "../../../../shared/Marketplace";

export class Get_assign_config_response implements Serializable<Get_assign_config_response> {
    public success: boolean = false;
    public data: Array<Marketplace> = [];
    public error: any;

    deserialize(input: any) {
        if (input) {

            this.success = input.success;
            this.error = input.error;

            if (input.data.length) {
                let mp: Marketplace;
                for (let i in input.data) {
                    mp = new Marketplace().deserialize(input.data[i]);
                    this.data.push(mp);
                }
            }

        }
        return this;
    }
}

export class Wildcard_assign_request implements Serializable<Wildcard_assign_request> {
    public marketplace_id: number = null;
    public is_obligatory: number = 0;
    public assign: number = 0;

    deserialize(input: any) {
        if (input) {
            this.marketplace_id = input.marketplace_id;
            this.assign = input.assign;
            this.is_obligatory = input.is_obligatory;
        }
        return this;
    }
}

export class Personal_assign_request implements Serializable<Personal_assign_request> {
    public marketplace_id: number = null;
    public users: Array<number> = [];

    deserialize(input: any) {
        if (input) {
            this.marketplace_id = input.id;
            this.users = input.users;
        }
        return this;
    }
}

export class Assign_response implements Serializable<Assign_response> {
    public success: boolean;
    public data: any;
    public errors: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = input.data;
            this.errors = input.errors
        }
        return this;
    }
}
