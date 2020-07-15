import {Serializable} from "./Serializeble.interface";

export class Marketplace_status implements Serializable<Marketplace_status> {
    public id: number = null;
    public status: string = '';

    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.status = input.status;
        }
        return this;
    }
}