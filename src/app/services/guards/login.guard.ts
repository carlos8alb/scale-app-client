import { Injectable } from '@angular/core';
import { CanActivateChild , Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivateChild  {

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    public router: Router
  ) {

  }

  canActivateChild() {
    if (this._userService.loggedIn()) {
      if (this._userService.isTokenExpired()) {
        return true;
      }
    }
    this._userService.logOut();
    this.router.navigate(['/login']);
    return false;
  }

}
