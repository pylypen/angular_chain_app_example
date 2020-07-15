import {Serializable} from "../../../../../shared/Serializeble.interface";
import {Marketplace} from "../../../../../shared/Marketplace";
import {Marketplace_status} from "../../../../../shared/Marketplace_status.model";
import {importExpr} from "@angular/compiler/src/output/output_ast";

export class Approve_settings implements Serializable<Approve_settings> {
    public marketplace: Array<Marketplace> = [];
    public statuses: Array<Marketplace_status> = [];

    deserialize(input: any) {
        if (input) {

            if (input.marketplace.length) {
                let marketplace: Marketplace;
                for (let i in input.marketplace) {
                    marketplace = new Marketplace().deserialize(input.marketplace[i]);
                    this.marketplace.push(marketplace);
                }
            }

            if (input.statuses.length) {
                let status: Marketplace_status;
                for (let i in input.statuses) {
                    status = new Marketplace_status().deserialize(input.statuses[i]);
                    this.statuses.push(status);
                }
            }

        }
        return this;
    }
}

export class Get_approve_settings_config implements Serializable<Get_approve_settings_config> {
    public success: boolean = false;
    public data: Approve_settings = new Approve_settings();
    public errors: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Approve_settings().deserialize(input.data);
            this.errors = input.errors;
        }
        return this;
    }
}

export class Update_approve_settings_request_item implements Serializable<Update_approve_settings_request_item> {
    public id: number = null;
    public marketplace_status_id: number = null;
    public review_message: string = '';

    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.marketplace_status_id = input.marketplace_status_id;
            this.review_message = input.review_message;
        }
        return this;
    }
}

export class Update_approve_settings_request implements Serializable<Update_approve_settings_request> {
    public marketplace: Array<Update_approve_settings_request_item> = [];

    deserialize(input: any) {
        if (input) {
            if (input.marketplace.length) {
                let marketplace_item: Update_approve_settings_request_item;
                for (let i in input.marketplace) {
                    marketplace_item = new Update_approve_settings_request_item().deserialize(input.statuses[i]);
                    this.marketplace.push(marketplace_item);
                }
            }
        }
        return this;
    }
}

export class Update_approve_settings_response implements Serializable<Update_approve_settings_response> {
    public success: boolean = false;
    public data: any;
    public errors: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = input.data;
            this.errors = input.errors;
        }
        return this;
    }
}