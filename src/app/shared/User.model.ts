import {Serializable} from "./Serializeble.interface";
import {Media_file} from "./Media_file.model";
import {User_organisation} from "./User_organisation";
import {User_team} from "./User_team";

export class User implements Serializable<User> {
    public id: number = null;
    public confirm_code: string = '';
    public email: string = '';
    public contact_email: string = '';
    public birthday: Date = null;
    public phone_number: string = '';
    public avatar: Media_file = new Media_file();
    public first_name: string = '';
    public last_name: string = '';
    public nickname: string = '';
    public login_at: Date = null;

    // optional params
    public user_organisation: User_organisation = new User_organisation();
    public user_teams: Array<User_team> = [];
    public course_progress: number = 0;

    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.confirm_code = input.confirm_code;
            this.email = input.email;
            this.phone_number = input.phone_number;
            this.avatar = new Media_file().deserialize(input.avatar);
            this.first_name = input.first_name;
            this.last_name = input.last_name;
            this.nickname = input.nickname;

            if (input.course_progress) {
                this.course_progress = input.course_progress;
            }

            if (!input.contact_email || !input.contact_email.length) {
                this.contact_email = input.email;
            }

            if (input.birthday) {
                this.birthday = new Date(Date.parse(input.birthday));
            }

            if (input.login_at) {
                this.login_at = new Date(Date.parse(input.login_at + ' UTC'));
            }

            if (input.users_organisations && input.users_organisations.length) {
                this.user_organisation = new User_organisation().deserialize(input.users_organisations[0]);
            }

            if (input.users_teams && input.users_teams.length) {
                let ut: User_team;
                for (let i in input.users_teams) {
                    ut = new User_team().deserialize(input.users_teams[i]);
                    this.user_teams.push(ut);
                }
            }
        }
        return this;
    }

    displayName(): string {
        // with the god help :)
        if ((this.first_name && this.last_name) && (this.first_name.length && this.last_name.length)) {
            return this.first_name + ' ' + this.last_name;

        } else if (this.first_name && this.first_name.length) {
            return this.first_name

        } else if (this.last_name && this.last_name.length) {
            return this.last_name

        } else {
            return this.email.split('@')[0];
        }
    }
}