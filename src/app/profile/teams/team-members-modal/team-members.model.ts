import {Serializable} from "../../../shared/Serializeble.interface";
import {Team} from "../../../shared/Team.model";
import {User} from "../../../shared/User.model";

export class Team_members_config implements Serializable<Team_members_config> {
    public team: Team = new Team();
    public members: Array<User> = [];
    public users: Array<User> = [];

    deserialize(input: any) {
        if (input) {
            this.team = new Team().deserialize(input.team);
            if (input.members.length) {
                let member: User;
                for (let i in input.members) {
                    member = new User().deserialize(input.members[i]);
                    this.members.push(member);
                }
            }
            if (input.users.length) {
                let user: User;
                for (let i in input.users) {
                    user = new User().deserialize(input.users[i]);
                    this.users.push(user);
                }
            }
        }
        return this;
    }
}

export class Get_team_members_config_response implements Serializable<Get_team_members_config_response> {
    public success: boolean = false;
    public data: Team_members_config = new Team_members_config();
    public error: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Team_members_config().deserialize(input.data)
            //todo: errors
        }
        return this;
    }
}

export class Update_team_members_response implements Serializable<Update_team_members_response> {
    public success: boolean = false;
    public data: Team = new Team();
    public error: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Team().deserialize(input.data)
            //todo: errors
        }
        return this;
    }
}
