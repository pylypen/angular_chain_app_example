import {Serializable} from "../../../../shared/Serializeble.interface";
import {Field_error} from "../../../../shared/Field_error.model";
import {Course} from "../../../../shared/Course.model";
import {Media_file} from "../../../../shared/Media_file.model";

export class Update_course_details_request implements Serializable<Update_course_details_request> {
    public name: string = '';
    public subtitle: string = '';
    public description: string = '';
    public featured_background: Media_file = new Media_file();
    public thumbnail: Media_file = new Media_file();

    deserialize(input: any) {
        if (input) {
            this.name = input.name;
            this.subtitle = input.subtitle;
            this.description = input.description;
            this.featured_background = new Media_file().deserialize(input.featured_background);
            this.thumbnail = new Media_file().deserialize(input.thumbnail);
        }
        return this;
    }
}

export class Update_course_details_errors implements Serializable<Update_course_details_errors> {
    public name: Field_error = new Field_error();
    public subtitle: Field_error = new Field_error();
    public description: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.name = new Field_error().deserialize(input.name);
            this.subtitle = new Field_error().deserialize(input.subtitle);
            this.description = new Field_error().deserialize(input.description);
        }
        return this;
    }
}

export class Update_course_details_response implements Serializable<Update_course_details_response> {
    public success: boolean = false;
    public data: Course = new Course();
    public errors: Update_course_details_errors = new Update_course_details_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Course().deserialize(input.data);
            this.errors = new Update_course_details_errors().deserialize(input.errors);
        }
        return this;
    }
}

export class Delete_course_errors implements Serializable<Delete_course_errors> {
    public course: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.course = new Field_error().deserialize(input.course);
        }
        return this;
    }
}

export class Delete_course_response implements Serializable<Delete_course_response> {
    public success: boolean = false;
    public errors: Delete_course_errors = new Delete_course_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.errors = new Delete_course_errors().deserialize(input.errors);
        }
        return this;
    }
}

export class Update_thumbnail_errors implements Serializable<Update_thumbnail_errors> {
    public thumbnail: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.thumbnail = new Field_error().deserialize(input.thumbnail);
        }
        return this;
    }
}

export class Update_thumbnail_response implements Serializable<Update_thumbnail_response> {
    public success: boolean = false;
    public data: Media_file = new Media_file();
    public errors: Update_thumbnail_errors = new Update_thumbnail_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Media_file().deserialize(input.data);
            this.errors = new Update_thumbnail_errors().deserialize(input.errors);
        }
        return this;
    }
}

export class Reset_thumbnail_response implements Serializable<Reset_thumbnail_response> {
    public success: boolean = false;
    public data: Media_file = new Media_file();
    public errors: Update_thumbnail_errors = new Update_thumbnail_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Media_file();
            this.errors = new Update_thumbnail_errors().deserialize(input.errors);
        }
        return this;
    }
}

export class Update_featured_bg_errors implements Serializable<Update_featured_bg_errors> {
    public featured_background: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.featured_background = new Field_error().deserialize(input.featured_background);
        }
        return this;
    }
}

export class Update_featured_bg_response implements Serializable<Update_featured_bg_response> {
    public success: boolean = false;
    public data: Media_file = new Media_file();
    public errors: Update_featured_bg_errors = new Update_featured_bg_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Media_file().deserialize(input.data.featured_background);
            this.errors = new Update_featured_bg_errors().deserialize(input.errors);
        }
        return this;
    }
}

export class Reset_featured_bg_response implements Serializable<Reset_featured_bg_response> {
    public success: boolean = false;
    public data: Media_file = new Media_file();
    public errors: Update_featured_bg_errors = new Update_featured_bg_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Media_file();
            this.errors = new Update_featured_bg_errors().deserialize(input.errors);
        }
        return this;
    }
}


export class Uploader_default_config implements Serializable<Uploader_default_config> {
    public autoUpload: boolean = true;
    public method: string = 'POST';
    public headers: Array<any> = [
        {
            name: 'Authorization',
            value: null,
        }
    ]

    deserialize(input: string) {
        if (input) {
            this.headers[0].value = 'Bearer ' + input;
        }
        return this;
    }
    
}
