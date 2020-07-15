import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatCardModule, MatDialogModule,MatButtonModule, MatProgressBarModule, MatSidenavModule, MatExpansionModule} from "@angular/material";
import {DashboardComponent} from "./dashboard.component";
import {DashboardService} from "./dashboard.service";
import {AngularSvgIconModule} from "angular-svg-icon";



@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatDialogModule,
        MatButtonModule,
        CommonModule,
        FormsModule,
        MatExpansionModule,
        AngularSvgIconModule,
        RouterModule
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [
        DashboardService
    ]
})

export class DashboardModule {

}
