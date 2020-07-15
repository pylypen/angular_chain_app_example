import {NgModule} from '@angular/core';
import {CommonModule}   from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PublicLandingComponent} from "./public-landing.component";
import {RouterModule}    from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        PublicLandingComponent
    ],
})
export class PublicLandingModule {
}
