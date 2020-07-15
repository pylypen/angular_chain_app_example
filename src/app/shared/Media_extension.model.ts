import {Serializable} from "./Serializeble.interface";
import {Media_type} from "./Media_type.model";

export class Media_extension implements Serializable<Media_extension> {
    public id: number = null;
    public media_extension: string = '';
    public media_mime: string = '';
    public media_type: Media_type = new Media_type();

    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.media_extension = input.media_extension;
            this.media_mime = input.media_mime;
            this.media_type = new Media_type().deserialize(input.media_type);
        }
        return this;
    }
}