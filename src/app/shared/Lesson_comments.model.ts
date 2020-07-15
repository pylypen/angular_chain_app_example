import {Serializable} from "./Serializeble.interface";
import {User} from "./User.model";

export class Lesson_comments implements Serializable<Lesson_comments> {
    public id: number = null;
    public lesson_id: number = null;
    public user_id: number = null;
    public comment: string = '';
    public created_at: Date = new Date();
    public user: User = new User();

    public editing: boolean = false;
    public styled_comment: string = '';

    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.lesson_id = input.lesson_id;
            this.user_id = input.user_id;
            this.comment = input.comment;
            this.created_at = new Date(Date.parse(input.created_at + ' UTC'));
            this.user = new User().deserialize(input.user);
            this.addStyling();

            this.editing = false;
        }
        return this;
    }

    addStyling() {
        this.styled_comment = this.comment.replace(new RegExp(/\@(\S+)/gim), '<span>@$1</span>');
    }
}