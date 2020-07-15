import {Serializable} from "../../../shared/Serializeble.interface";
import {User} from "../../../shared/User.model";
import {Team} from "../../../shared/Team.model";

export class Team_settings_users implements Serializable<Team_settings_users> {

    public org_admins: Array<User> = [];
    public org_members: Array<User> = [];

    deserialize(input: any) {
        if (input) {
            if (input.org_admins.length) {
                let user: User;
                for (let i in input.org_admins) {
                    user = new User().deserialize(input.org_admins[i]);
                    this.org_admins.push(user);
                }
            }
            if (input.org_members.length) {
                let user: User;
                for (let i in input.org_members) {
                    user = new User().deserialize(input.org_members[i]);
                    this.org_members.push(user);
                }
            }
        }
        return this;
    }
}

export class Team_settings_config implements Serializable<Team_settings_config> {
    public admins: Array<User> = [];
    public team: Team = new Team();
    public users: Array<User> = [];

    deserialize(input: any) {
        if (input) {
            this.team = new Team().deserialize(input.team);

            if (input.users.length) {
                let user: User;
                for (let i in input.users) {
                    user = new User().deserialize(input.users[i]);
                    this.users.push(user);
                }
            }

            if (input.admins.length) {
                let admin: User;
                for (let i in input.admins) {
                    admin = new User().deserialize(input.admins[i]);
                    this.admins.push(admin);
                }
            }

        }
        return this;
    }
}

export class Get_team_settings_config_response implements Serializable<Get_team_settings_config_response> {
    public success: boolean = false;
    public data: Team_settings_config = new Team_settings_config();
    public errors: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Team_settings_config().deserialize(input.data);
            this.errors = input.errors;
        }
        return this;
    }
}

export class Renew_team_settings_response implements Serializable<Renew_team_settings_response> {
    public success: boolean = false;
    public data: Array<User> = [];
    public error: any;

    deserialize(input: any) {
        if (input && input.data.users) {
            this.success = input.success;
            if (input.data.length) {
                let user: User;
                for (let i in input.data) {
                    user = new User().deserialize(input.data[i]);
                    this.data.push(user);
                }
            }
        }
        return this;
    }
}

export class Update_team_settings_response implements Serializable<Update_team_settings_response> {
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