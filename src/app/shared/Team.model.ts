import {Serializable} from "./Serializeble.interface";
import {Media_file} from "./Media_file.model";
import {Marketplace} from "./Marketplace";
import {User} from "./User.model";

export class Team implements Serializable<Team> {
    public id: number;
    public organisation_id: number;
    public name: string;
    public description: string;
    public logo: Media_file;

    // optional params
    public marketplace: Array<Marketplace> = [];
    public users: Array<User> = [];
    public course_progress: number = 0;

    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.organisation_id = input.organisation_id;
            this.name = input.name;
            this.description = input.description;
            this.logo = new Media_file().deserialize(input.logo);

            if(input.course_progress){
                this.course_progress = input.course_progress;
            }

            if (input.marketplace && input.marketplace.length) {
                let mp: Marketplace;
                for (let i in input.marketplace) {
                    mp = new Marketplace().deserialize(input.marketplace[i]);
                    this.marketplace.push(mp);
                }
            }

            if(input.users && input.users.length){
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