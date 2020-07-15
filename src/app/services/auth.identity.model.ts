import {Serializable} from '../shared/Serializeble.interface'
import {User} from "../shared/User.model";
import {Organisation} from "../shared/Organisation.model";

export class Identity implements Serializable<Identity> {

    private authorised: boolean;

    public token: string;
    public user: User = new User();
    public organisation: Organisation = new Organisation();

    deserialize(input: any) {
        if (input) {
            this.token = input.token;
            if (this.token != '') {
                this.authorised = true;
            }
            this.user = new User().deserialize(input.user);
            this.organisation = new Organisation().deserialize(input.organisation);
        }

        return this;
    }

    constructor() {
        this.authorised = false;
    }

    is_authorised(): boolean {
        return this.authorised;
    }
}

