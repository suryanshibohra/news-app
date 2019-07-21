import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor( private _router: Router) {
  }
  
  checkAuth(): boolean {
    if(!(this._router.url === '/news')){
      this._router.navigate(['/news']);
    }
    return true;
  }

  canActivate() {
    return this.checkAuth();
  }
}
