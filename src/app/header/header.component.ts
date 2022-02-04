import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import AuthService from '../services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  ViewDocs() {
    this.router.navigate(['/docs'])
  }
  ViewUser() {
    this.router.navigate(['/account'])
  }
  GoUpload() {
    this.router.navigate(['/maps/upload'])
  }
}
