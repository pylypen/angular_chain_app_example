import {Serializable} from "./Serializeble.interface";

export class Media_type implements Serializable<Media_type> {
    public id: number = null;
    public name: string = '';

    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.name = input.name;
        }
        return this;
    }
}