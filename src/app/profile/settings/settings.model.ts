import {Serializable} from "../../shared/Serializeble.interface";
import {Organisation} from "../../shared/Organisation.model";

class OrganisationResponse implements Serializable<OrganisationResponse> {
    public user_id: number;
    public organisation_id: number;
    public is_admin: boolean = false;
    public is_owner: boolean = false;
    public organisation: Organisation = new Organisation();

    deserialize(input: any) {

        if (input) {
            this.user_id = input.user_id;
            this.organisation_id = input.organisation_id;
            this.is_admin = (input.is_admin);
            this.is_owner = (input.is_owner);
            this.organisation = new Organisation().deserialize(input.organisation);
        }

        return this;
    }

}

export class SettingsConfig implements Serializable<SettingsConfig> {
    public organisation: OrganisationResponse = new OrganisationResponse();

    deserialize(input: any) {

        if (input) {
            this.organisation = new OrganisationResponse().deserialize(input.data.organisation);
        }

        return this;
    }
}