import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()

export class IntercomService {


    private intercomStateSource = new BehaviorSubject<string>("hide");
    public currentIntercomState = this.intercomStateSource.asObservable();

    constructor() {
    }

    changeIntercomState(state: string) {
        this.intercomStateSource.next(state)
    }


}