import {Serializable} from "./Serializeble.interface";
import {Marketplace_status} from "./Marketplace_status.model";
import {User} from "./User.model";
import {Team} from "./Team.model";
import {User_course} from "./User_course.model";

export class Marketplace implements Serializable<Marketplace> {
    public id: number = null;
    public team_id: number = null;
    public course_id: number = null;
    public is_wildcard_assigned: number = 0;
    public is_wildcard_obligatory: number = 0;
    public is_published: number = 0;
    public review_completed: number = 0;
    public review_message: string = '';
    public status: Marketplace_status = new Marketplace_status();

    // optional params
    public reviewed_by: User = new User();
    public team: Team = new Team();
    public users_course: Array<User_course> = [];


    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.team_id = input.team_id;
            this.course_id = input.course_id;
            this.is_wildcard_assigned = input.is_wildcard_assigned;
            this.is_wildcard_obligatory = input.is_wildcard_obligatory;
            this.is_published = input.is_published;
            this.review_completed = input.review_completed;
            this.review_message = input.review_message;
            this.status = new Marketplace_status().deserialize(input.status);

            //optional params
            if (input.reviewed_by) {
                this.reviewed_by = new User().deserialize(input.reviewed_by);
            }
            if (input.team) {
                this.team = new Team().deserialize(input.team);
            }

            if (input.users_course && input.users_course.length) {
                let uc: User_course;
                for (let i in input.users_course) {
                    uc = new User_course().deserialize(input.users_course[i]);
                    this.users_course.push(uc);
                }

            }

        }
        return this;
    }

}