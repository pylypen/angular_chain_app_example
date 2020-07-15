import {Serializable} from "./Serializeble.interface";
import {Team} from "./Team.model";

export class User_team implements Serializable<User_team> {
    public user_id: number = null;
    public team_id: number = null;
    public is_admin: boolean = false;

    public team: Team = new Team();


    deserialize(input: any) {
        if (input) {
            this.user_id = input.user_id;
            this.team_id = input.team_id;
            this.is_admin = input.is_admin;

            this.team = new Team().deserialize(input.team);
        }
        return this;
    }
}