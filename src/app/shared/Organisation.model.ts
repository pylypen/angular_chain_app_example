import {Serializable} from "./Serializeble.interface";
import {Media_file} from "./Media_file.model";
import {Team} from "./Team.model";

export class Organisation implements Serializable<Organisation> {

    public id: number;
    public email: string;
    public name: string;
    public phone_number: string;
    public state: string;
    public city: string;
    public street: string;
    public zip: string;
    public logo: Media_file = new Media_file();
    public cover_picture: Media_file = new Media_file();
    public teams: Array<Team> = [];

    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.email = input.email;
            this.name = input.name;
            this.phone_number = input.phone_number;
            this.state = input.state;
            this.city = input.city;
            this.street = input.street;
            this.zip = input.zip;
            this.logo = new Media_file().deserialize(input.logo);
            this.cover_picture = new Media_file().deserialize(input.cover_picture);

            if (input.teams && input.teams.length) {
                let team: Team;
                for (let i in input.teams) {
                    team = new Team().deserialize(input.teams[i]);
                    this.teams.push(team);
                }
            }

        }

        return this;
    }
}