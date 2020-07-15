import {Serializable} from "../../../shared/Serializeble.interface";
import {Certificate} from "../../../shared/Certificate.model";

export class Get_certificates_list_response implements Serializable<Get_certificates_list_response> {
    public success: boolean = false;
    public data: Array<Certificate> = [];
    public errors: any;

    deserialize(input: any) {
        this.success = input.success;

        if(input.data && input.data.length){
            let cert: Certificate;
            for (let i in input.data) {
                cert = new Certificate().deserialize(input.data[i]);
                this.data.push(cert);
            }
        }

        this.errors = input.errors;

        return this;
    }
}