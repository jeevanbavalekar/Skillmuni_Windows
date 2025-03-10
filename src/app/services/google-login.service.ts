import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import * as $ from 'jquery';  // Import jQuery
import { LoaderService } from './loader.service'; // Import LoaderService

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleLoginService {
  private apiUrl = 'https://skillmuni.in/signupsignin/api/user/add';

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
    private loaderService: LoaderService // Inject LoaderService
  ) { }

  initializeGoogleLogin(callback: (response: any) => void): Promise<void> {
    return this.loadGoogleScript().then(() => {
      google.accounts.id.initialize({
        client_id: '572766942851-mgjc033rh59hgjp604u5mjidf4kok555.apps.googleusercontent.com',
        callback: callback,
      });

      this.renderGoogleButton();
    });
  }

  private renderGoogleButton(): void {
    setTimeout(() => {
      const googleBtn = document.getElementById('google-btn');
      if (googleBtn) {
        google.accounts.id.renderButton(googleBtn, {
          text: 'continue_with',
          theme: 'outline',
          size: 'large',
          shape: 'circle',
          width: '250',
        });
      }
    }, 100);
  }

  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve) => {
      if (document.getElementById('google-js')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-js';
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  handleLogin(response: any): void {
    console.log('handleLogin triggered:', response);

    if (response) {
      const payload = this.decodeToken(response.credential);
      if (!payload) {
        console.error('Failed to decode Google token');
        return;
      }

      // Update AuthService with the logged-in user
      this.authService.login(payload);

      // Create userData with payload values
      const userData = {
        ID_CODE: 0,
        ID_ORGANIZATION: 0,
        ID_ROLE: 0,
        USERID: payload.email || '',
        PASSWORD: '',
        FBSOCIALID: '',
        GPSOCIALID: payload.sub || '',
        STATUS: 'A',
        EXPIRY_DATE: '2025-12-31T00:00:00',
        EMPLOYEEID: '',
        user_department: '',
        user_designation: '',
        user_function: '',
        user_grade: '',
        user_status: '',
        reporting_manager: 0,
        is_reporting: 0,
        ref_id: '',
        FIRSTNAME: payload.given_name || '',
        LASTNAME: payload.family_name || '',
        AGE: 0,
        LOCATION: '',
        EMAIL: payload.email || '',
        MOBILE: '',
        GENDER: '',
        DESIGNATION: '',
        CITY: '',
        OFFICE_ADDRESS: '',
        DATE_OF_BIRTH: '1900-01-01T00:00:00',
        DATE_OF_JOINING: '1900-01-01T00:00:00',
        REPORTING_MANAGER: '',
        PROFILE_IMAGE: payload.picture || '',
        COLLEGE: '',
        GRADUATIONYEAR: '1900',
        STATE: '',
        ResumeFlag: 0,
        ResumeLocation: '',
        id_degree: 0,
        id_stream: 0,
        COUNTRY: '',
        STUDENT: 0,
        NOTSTUDENT: 0,
        OTHERSTREAM: '',
        id_foundation: 0,
        clg_city: '',
        clg_state: '',
        clg_country: '',
        social_dp_flag: 0,
      };

      console.log('User Data to be Stored:', userData);

      // Send data to backend
      this.storeUserData(userData);
    }
  }

  private storeUserData(user: any): void {
    console.log('Sending user data to backend:', user);

    // ✅ Show loader before making API call
    this.loaderService.show();

    // Using jQuery AJAX instead of HttpClient
    $.ajax({
      url: this.apiUrl,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(user),
      success: (response: any) => {
        console.log('User data stored successfully:', response);

        // ✅ Navigate to home page after a successful response
        this.ngZone.run(() => {
          this.router.navigate(['/home']).then(() => {
            this.loaderService.hide(); // ✅ Hide loader after navigation is complete
          });
        });
      },
      error: (xhr: any, status: string, error: string) => {
        console.error('Error storing user data:', error);
        console.log('XHR Object:', xhr);
        console.log('Status:', status);

        // Check for "Email already exists!" in response and allow navigation
        if (xhr.status === 400 && xhr.responseText.includes('Email already exists!')) {
          console.log('Email already exists. Logging in...');

          // ✅ Allow login for existing users
          this.ngZone.run(() => {
            this.router.navigate(['/home']).then(() => {
              this.loaderService.hide(); // ✅ Hide loader after navigation is complete
            });
          });
        } else {
          console.error('Login failed:', error);
          this.loaderService.hide(); // ✅ Ensure loader hides even on failure
        }
      },
    });
  }

}
