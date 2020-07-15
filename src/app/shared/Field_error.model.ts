import {Serializable} from "./Serializeble.interface";

export class Field_error implements Serializable<Field_error> {
    public display: boolean = false;
    public message: string = '';

    deserialize(input: Array<any>) {

        if (input && input.length) {
            this.display = true;
            this.message = input[0];
        }

        return this;
    }
}