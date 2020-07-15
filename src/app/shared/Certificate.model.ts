import {Serializable} from "./Serializeble.interface";

export class Certificate implements Serializable<Certificate> {
    public id: number = null;
    public user_id: number = null;
    public course_id: number = null;
    public cert_name: string = '';
    public issued_user_name: string = '';
    public issued_course_name: string = '';
    public issued_course_author_name: string = '';
    public issued_course_count_lessons: string = '';
    public issued_org_name: string = '';
    public issued_at: Date = null;

    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.user_id = input.user_id;
            this.course_id = input.course_id;
            this.cert_name = input.cert_name;
            this.issued_user_name = input.issued_user_name;
            this.issued_course_name = input.issued_course_name;
            this.issued_course_author_name = input.issued_course_author_name;
            this.issued_course_count_lessons = input.issued_course_count_lessons;
            this.issued_org_name = input.issued_org_name;
            this.issued_at = new Date(Date.parse(input.updated_at + ' UTC'));
        }
        return this;
    }
}