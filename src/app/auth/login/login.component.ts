import { Component, OnInit } from '@angular/core';
import { GoogleLoginService } from 'src/app/services/google-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private googleLoginService: GoogleLoginService) { }

  ngOnInit(): void {
    this.googleLoginService.initializeGoogleLogin((response: any) => {
      this.googleLoginService.handleLogin(response);
    });
  }
}