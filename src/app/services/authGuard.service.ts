import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import AuthService from './auth.service'

@Injectable({
  providedIn: 'root',
})
export default class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService) {}
  canActivate() {
    return this.authService.userData ? true : false
  }
}
