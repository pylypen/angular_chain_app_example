import {Serializable} from "./Serializeble.interface";

export class Media_file implements Serializable<Media_file> {
    public id: number = null;
    public src: string = '';
    public thumbnail: string = '';

    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.src = input.src;
            this.thumbnail = input.thumbnail;
        }
        return this;
    }
}