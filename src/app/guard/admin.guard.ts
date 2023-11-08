import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {UserService} from "../service/user.service";

export const AdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(UserService).user.role === "admin"
    ? true
    : inject(Router).createUrlTree(['login']);
};
