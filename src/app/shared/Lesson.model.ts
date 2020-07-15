import {Serializable} from "./Serializeble.interface";
import {Media} from "./Media.model";
import {Lesson_progress} from "./Lesson_progress.model";

export class Lesson implements Serializable<Lesson> {
    public id: number = null;
    public name: string = '';
    public description: string = '';
    public order: number = 1;
    public allow_comments: boolean = false;

    public progress: Lesson_progress = new Lesson_progress();

    public video_media: Array<Media> = [];
    public audio_media: Array<Media> = [];
    public document_media: Array<Media> = [];

    public embed_youtube_media: Array<Media> = [];

    public articulate_media: Array<Media> = [];


    displayName(){
        let displayName = this.name.length > 25 ? this.name.slice(0, 25) + "..." : this.name;
        return displayName;
    }

    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.name = input.name;
            this.description = input.description;
            this.order = input.order;
            this.allow_comments = input.allow_comments;

            this.progress = new Lesson_progress().deserialize(input.progress);

            if (input.media && input.media.length) {
                let media: Media;
                for (let i in input.media) {
                    media = new Media().deserialize(input.media[i]);

                    switch (media.media_extension.media_type.name) {
                        case 'Video': {
                            this.video_media.push(media);
                            break;
                        }
                        case 'Audio': {
                            this.audio_media.push(media);
                            break;
                        }
                        case 'Document': {
                            this.document_media.push(media);
                            break;
                        }
                        case 'Embed': {
                            if (media.media_extension.media_extension == 'youtube') {
                                this.embed_youtube_media.push(media);
                            }
                            break;
                        }
                        case 'Articulate': {
                            this.articulate_media.push(media);
                            break;
                        }

                    }
                }
            }

        }
        return this;
    }
}