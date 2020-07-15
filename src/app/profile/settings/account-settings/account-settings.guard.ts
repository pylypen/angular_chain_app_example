import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {SettingsService} from "../settings.service";
import {SettingsConfig} from "../settings.model";

@Injectable()
export class AccountSettingsGuard implements CanActivate {

    constructor(private router: Router,
                private settingService: SettingsService) {
    }

    canActivate() {
        let settingsConfig: SettingsConfig = this.settingService.getSettingsActualConfig();
        if (settingsConfig.organisation.is_admin || settingsConfig.organisation.is_owner) {
            return true;
        } else {
            this.router.navigate(['/profile/settings/personal-information']);
            return false;
        }
    }
}