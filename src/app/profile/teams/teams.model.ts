import {Serializable} from '../../shared/Serializeble.interface';
import {User} from "../../shared/User.model";
import {Team} from "../../shared/Team.model";
import {Organisation} from "../../shared/Organisation.model";
import {Media_file} from "../../shared/Media_file.model";

class TeamBelongsTo implements Serializable<TeamBelongsTo> {
    public organisation: Organisation = new Organisation();
    public logo: Media_file = new Media_file();

    deserialize(input: any) {
        if (input) {
            this.organisation = new Organisation().deserialize(input.organisation);
            this.logo = new Media_file().deserialize(input.logo);
        }
        return this;
    }
}

export class TeamsItem implements Serializable<TeamsItem> {
    public team: Team;
    public belongs_to: TeamBelongsTo = new TeamBelongsTo();
    public member_count: number;
    public member_preview: Array<User> = [];
    public is_admin: boolean;
    public is_member: boolean;

    deserialize(input: any) {
        this.team = new Team().deserialize(input.team);
        this.belongs_to = new TeamBelongsTo().deserialize(input.belongs_to);
        this.member_count = input.member_count;
        this.is_admin = input.is_admin;
        this.is_member = input.is_member;
        if (input.member_preview.length) {
            for (let i in input.member_preview) {
                let member_preview_item: User = new User().deserialize(input.member_preview[i]);

                this.member_preview.push(member_preview_item);
            }
        }
        return this;
    }

}

export class TeamsList implements Serializable<TeamsList> {
    public allow_create: boolean = false;
    public teams: Array<TeamsItem> = [];

    deserialize(input: any) {
        this.allow_create = input.allow_create;

        if (input.teams.length) {
            for (let i in input.teams) {
                let team_item: TeamsItem = new TeamsItem().deserialize(input.teams[i]);
                this.teams.push(team_item);
            }
        }
        return this;
    }

    public visibleTeams(){
        return this.teams.slice(0,5);
    }

    public displayAllTeams(){
        return this.teams;
    }

    public teamsCountWithoutVisible(){
        let count = this.teams.length - this.teams.slice(0,5).length;
        return (count > 0) ? count : false;
    }
    public teamsWithoutVisible(){
        let count = this.teams.length - this.teams.slice(0,5).length;
        let teams = [];
        
        for (let t of this.teams.slice(5)) {
            teams.push(t.team.name);
        }
        
        return (count > 0) ? teams.join(', ') : false;
    }
}

export class Get_teams_response implements Serializable<Get_teams_response> {
    public success: boolean;
    public data: TeamsList = new TeamsList();
    public error: any;

    deserialize(input: any) {

        this.success = input.success;
        this.data = new TeamsList().deserialize(input.data);
        this.error = input.error;

        return this;
    }
}