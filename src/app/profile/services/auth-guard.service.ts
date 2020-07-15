import {Injectable} from '@angular/core';
import {Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {Identity} from "../../services/auth.identity.model";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let clUser: Identity = this.authService.getCurrentUser();
        if (clUser.is_authorised()) {
            return true;
        } else {
            this.authService.setRedirect(state.url);
            this.router.navigate(['/login']);
            return false;
        }
    }
}