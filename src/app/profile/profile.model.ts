import {Serializable} from "../shared/Serializeble.interface";
import {Field_error} from "../shared/Field_error.model";
import {Environment} from "../../environments/environment";

export class Request_certificate_response_errors implements Serializable<Request_certificate_response_errors> {
    public course: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.course = new Field_error().deserialize(input.course);
        }
        return this;
    }
}

export class Request_certificate_response implements Serializable<Request_certificate_response> {
    public success: boolean = false;
    public data: string = '';
    public errors: Request_certificate_response_errors = new Request_certificate_response_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = '//' + Environment.certDomain + '/' + input.data;
            this.errors = new Request_certificate_response_errors().deserialize(input.errors);
        }
        return this;
    }

}