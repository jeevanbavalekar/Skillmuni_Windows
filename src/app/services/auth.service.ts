import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUserSubject = new BehaviorSubject<any>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor() {
    // Initialize with the user from localStorage (if any)
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.loggedInUserSubject.next(JSON.parse(loggedInUser));
    }
  }

  login(user: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.loggedInUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.loggedInUserSubject.next(null);
  }

  getLoggedInUser(): any {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }
}