import {Serializable} from "../../../../../shared/Serializeble.interface";
import {Lesson} from "../../../../../shared/Lesson.model";
import {Field_error} from "../../../../../shared/Field_error.model";
import {Course} from "../../../../../shared/Course.model";
import {Media} from "../../../../../shared/Media.model";

export class Get_lesson_details_response implements Serializable<Get_lesson_details_response> {
    public success: boolean = false;
    public data: Lesson = new Lesson();
    public error: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Lesson().deserialize(input.data);
        }
        return this;
    }
}

export class Update_lesson_request implements Serializable<Update_lesson_request> {
    public name: string = '';
    public description: string = '';
    public allow_comments: boolean = false;

    deserialize(input: any) {
        if (input) {
            this.name = input.name;
            this.description = input.description;
            this.allow_comments = input.allow_comments;
        }
        return this;
    }
}

export class Update_lesson_errors implements Serializable<Update_lesson_errors> {
    public name: Field_error = new Field_error();
    public description: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.name = new Field_error().deserialize(input.name);
            this.description = new Field_error().deserialize(input.description);
        }
        return this;
    }
}

export class Update_lesson_response implements Serializable<Update_lesson_response> {
    public success: boolean = false;
    public data: Course = new Course();
    public errors: Update_lesson_errors = new Update_lesson_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Course().deserialize(input.data);
            this.errors = new Update_lesson_errors().deserialize(input.errors);
        }
        return this;
    }
}

export class Delete_lesson_errors implements Serializable<Delete_lesson_errors> {
    public lesson: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.lesson = new Field_error().deserialize(input.lesson)
        }
        return this;
    }
}

export class Delete_lesson_response implements Serializable<Delete_lesson_response> {
    public success: boolean = false;
    public data: Course = new Course();
    public errors: Delete_lesson_errors = new Delete_lesson_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Course().deserialize(input.data);
            this.errors = new Delete_lesson_errors().deserialize(input.errors);
        }
        return this;
    }
}

export class Upload_media_errors implements Serializable<Upload_media_errors> {
    public file: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.file = new Field_error().deserialize(input.file);
        }
        return this;
    }
}

export class Upload_media_response implements Serializable<Upload_media_response> {
    public success: boolean = false;
    public data: any;
    public errors: Upload_media_errors = new Upload_media_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Course().deserialize(input.data);
            this.errors = new Upload_media_errors().deserialize(input.errors);
        }
        return this;
    }
}

export class Add_youtube_media_request implements Serializable<Add_youtube_media_request> {
    public src: string;

    deserialize(input: any) {
        if (input) {
            this.src = input.src;
        }
        return this;
    }
}

export class Add_youtube_media_errors implements Serializable<Add_youtube_media_errors> {
    public src: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.src = new Field_error().deserialize(input.src);
        }
        return this;
    }
}

export class Add_youtube_media_response implements Serializable<Add_youtube_media_response> {
    public success: boolean = false;
    public data: Array<Media> = [];
    public errors: Add_youtube_media_errors = new Add_youtube_media_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.errors = new Add_youtube_media_errors().deserialize(input.errors);

            if (input.data && input.data.length) {
                let media: Media;
                for (let i in input.data) {
                    media = new Media().deserialize(input.data[i]);
                    this.data.push(media);
                }
            }
        }

        return this;
    }
}

export class Delete_youtube_media_response implements Serializable<Delete_youtube_media_response> {
    public success: boolean = false;
    public data: Array<Media> = [];
    public errors: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.errors = input.errors;

            if (input.data && input.data.length) {
                let media: Media;
                for (let i in input.data) {
                    media = new Media().deserialize(input.data[i]);
                    this.data.push(media);
                }
            }
        }

        return this;
    }
}

export class Delete_media_response implements Serializable<Delete_media_response> {
    public success: boolean = false;
    public data: any;
    public errors: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.errors = input.errors;
        }
        return this;
    }
}

export class Lesson_media_list implements Serializable<Lesson_media_list>{
    public library: Array<Media> = new Array<Media>();
    public uses: Array<Media> = new Array<Media>();
    
        deserialize(input: any) {
        if (input) {
            if (input.library.length) {
                let media: Media;
                for (let i in input.library) {
                    media = new Media().deserialize(input.library[i]);
                    this.library.push(media);
                }
            }
            if (input.uses.length) {
                let media: Media;
                for (let i in input.uses) {
                    media = new Media().deserialize(input.uses[i]);
                    this.uses.push(media);
                }
            }
        }
        return this;
    }
}


export class Get_lesson_media_types_response implements Serializable<Get_lesson_media_types_response>{
    public success: boolean = false;
    public data: Lesson_media_list = new Lesson_media_list();
    public errors: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Lesson_media_list().deserialize(input.data);
            this.errors = input.errors;
        }
        return this;
    }
}


export class Update_lesson_content_order_request implements Serializable<Update_lesson_content_order_request>{
    public uses: Array<Media>;
    public library: Array<Media>;
    public lesson_id: number;

    deserialize(input: any) {
        if (input) {

            this.uses = input.uses;
            this.library = input.library;
            this.lesson_id = input.lesson_id;
        }
        return this;
    }

}


export class Update_lesson_content_order_errors implements Serializable<Update_lesson_content_order_errors> {
    public uses: Field_error = new Field_error();
    public lesson_id: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.uses = new Field_error().deserialize(input.uses);
            this.lesson_id = new Field_error().deserialize(input.lesson_id);
        }
        return this;
    }
}



export class Update_lesson_content_order_response implements Serializable<Update_lesson_content_order_response> {
    public data: any;
    public errors: Update_lesson_content_order_errors = new Update_lesson_content_order_errors();
    public success: boolean;

    deserialize(input: any) {
        if (input) {
            this.data = input.data;
            this.errors = new Update_lesson_content_order_errors().deserialize(input.errors);
            this.success = input.success;
        }
        return this;
    }
}
