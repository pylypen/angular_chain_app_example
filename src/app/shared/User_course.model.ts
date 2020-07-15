import {Serializable} from "./Serializeble.interface";

export class User_course implements Serializable<User_course> {
    public id: number = null;
    public organisation_id: number = null;
    public team_id: number = null;
    public user_id: number = null;
    public assigned_by_id: number = null;
    public marketplace_id: number = null;
    public course_id: number = null;
    public is_obligatory: number = 0;
    public is_team_assigned: number = 0;

    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.organisation_id = input.organisation_id;
            this.team_id = input.team_id;
            this.user_id = input.user_id;
            this.assigned_by_id = input.assigned_by_id;
            this.marketplace_id = input.marketplace_id;
            this.course_id = input.course_id;
            this.is_obligatory = input.is_obligatory;
            this.is_team_assigned = input.is_team_assigned;
        }
        return this;
    }

}