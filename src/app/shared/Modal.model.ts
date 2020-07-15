import {Serializable} from "./Serializeble.interface";
import {MatDialogConfig} from "@angular/material";

export class Default_modal_400_width extends MatDialogConfig implements Serializable<Default_modal_400_width> {
    public disableClose: boolean = true;
    public height: string = 'auto';
    public width: string = '400px'
    public data: any = null;
    public autoFocus: boolean = false;

    deserialize(input: any) {
        if (input) {
            this.data = input;
        }
        return this;
    }
}


export class Default_modal_700_width extends MatDialogConfig implements Serializable<Default_modal_700_width>{
    public disableClose: boolean = true;
    public height: string = 'auto';
    public width: string = '700px'
    public data: any = null;
    public autoFocus: boolean = false;

    deserialize(input: any) {
        if (input) {
            this.data = input;
        }
        return this;
    }
}