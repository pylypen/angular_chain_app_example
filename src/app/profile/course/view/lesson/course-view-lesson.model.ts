import {Serializable} from "../../../../shared/Serializeble.interface";
import {Lesson_progress_status} from "../../../../shared/Lesson_progress_status.model";
import {Lesson_comments} from "../../../../shared/Lesson_comments.model";
import {User} from "../../../../shared/User.model";

export class Update_lesson_progress_request implements Serializable<Update_lesson_progress_request> {
    public progress_status_id: number = 1;

    deserialize(input: any) {
        if (input) {
            this.progress_status_id = input.progress_status_id;
        }
        return this;
    }
}

export class Update_lesson_progress_response implements Serializable<Update_lesson_progress_response> {
    public success: boolean = false;
    public data: Lesson_progress_status = new Lesson_progress_status();
    public errors: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Lesson_progress_status().deserialize(input.data);
            this.errors = input.errors;
        }
        return this;
    }
}

export class Lesson_comments_response_data implements Serializable<Lesson_comments_response_data> {
    public comments: Array<Lesson_comments> = [];
    public mention_list: Array<User> = [];

    deserialize(input: any) {
        if (input) {
            if (input.comments.length) {
                let comment: Lesson_comments;
                for (let i in input.comments) {
                    comment = new Lesson_comments().deserialize(input.comments[i]);
                    this.comments.push(comment);
                }
            }

            if (input.mention_list && input.mention_list.length) {
                let mention: User;
                for (let i in input.mention_list) {
                    mention = new User().deserialize(input.mention_list[i]);
                    this.mention_list.push(mention);
                }
            }

        }
        return this;
    }
}

export class Get_lesson_comments_response implements Serializable<Get_lesson_comments_response> {
    public success: boolean = false;
    public data: Lesson_comments_response_data = new Lesson_comments_response_data();
    public errors: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Lesson_comments_response_data().deserialize(input.data);
            this.errors = input.errors;
        }
        return this;
    }
}

export class Post_comment_response implements Serializable<Post_comment_response> {
    public success: boolean = false;
    public data: Lesson_comments = new Lesson_comments();
    public errors: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.errors = input.errors;

            this.data = new Lesson_comments().deserialize(input.data);

        }
        return this;
    }
}