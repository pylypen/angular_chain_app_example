import {Serializable} from "./Serializeble.interface";
import {Media_file} from "./Media_file.model";
import {Media_extension} from "./Media_extension.model";

export class Media implements Serializable<Media> {
    public id: number = null;
    public name: string = '';
    public file: Media_file = new Media_file();
    public media_extension: Media_extension = new Media_extension();

    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.name = input.name;
            this.file = new Media_file().deserialize(input.file);
            this.media_extension = new Media_extension().deserialize(input.media_extension);
        }
        return this;
    }


    shortName() {
        if (this.name.length > 20) {
            return this.name.slice(0, 20) + '...';
        } else {
            return this.name;
        }
    }

}