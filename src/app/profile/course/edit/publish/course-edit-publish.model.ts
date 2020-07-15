import {Serializable} from "../../../../shared/Serializeble.interface";
import {Organisation} from "../../../../shared/Organisation.model";
import {Team} from "../../../../shared/Team.model";

export class Course_publish_config implements Serializable<Course_publish_config> {
    public organisation: Organisation = new Organisation();

    public org_teams_never: Array<Team> = [];
    public org_teams_pending: Array<Team> = [];
    public org_teams_rejected: Array<Team> = [];
    public org_teams_accepted: Array<Team> = [];

    deserialize(input: any) {
        if (input) {
            let org: Organisation = new Organisation().deserialize(input.organisation);
            this.organisation = new Organisation().deserialize(input.organisation);
            this.organisation.teams = []; // cutting tails

            // process organisations
            if (org.teams.length) {
                for (let i in org.teams) {
                    if (org.teams[i].marketplace.length) {
                        if (org.teams[i].marketplace[0].status.id == 1) {
                            this.org_teams_pending.push(org.teams[i]);

                        } else if (org.teams[i].marketplace[0].status.id == 2) {
                            this.org_teams_accepted.push(org.teams[i]);

                        } else if (org.teams[i].marketplace[0].status.id == 3) {
                            this.org_teams_rejected.push(org.teams[i]);
                        }
                    } else {
                        this.org_teams_never.push(org.teams[i]);
                    }
                }
            }

        }
        return this;
    }
}

export class Get_request_review_config_response implements Serializable<Get_request_review_config_response> {
    public success: boolean = false;
    public data: Course_publish_config = new Course_publish_config();
    public errors: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Course_publish_config().deserialize(input.data);
            this.errors = input.errors;
        }
        return this;
    }
}

export class Update_course_display_request implements Serializable<Update_course_display_request> {
    public team_id: number = null;
    public course_id: number = null;
    public show: boolean = false;

    deserialize(input: any) {
        if (input) {
            this.team_id = input.team.id;
            this.course_id = input.course_id;
            this.show = input.show;
        }
        return this;
    }
}

export class Update_course_display_response implements Serializable<Update_course_display_response> {
    public success: boolean;
    public data: any;
    public error: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = input.data;
            this.error = input.error;
        }
        return this;
    }
}

export class Request_review_request implements Serializable<Request_review_request> {
    public team_id: number = null;
    public course_id: number = null;

    deserialize(input: any) {
        if (input) {
            this.team_id = input.team.id;
            this.course_id = input.course_id;
        }
        return this;
    }
}

export class Request_review_response implements Serializable<Request_review_response> {
    public success: boolean;
    public data: any;
    public error: any;

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = input.data;
            this.error = input.error;
        }
        return this;
    }
}