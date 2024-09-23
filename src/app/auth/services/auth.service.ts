import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: { id: number, name: string, email: string, password: string };

  constructor(
    private http: HttpClient
  ) { }

  register(user: { email: string, password: string, name: string }) {
    return this.http.post('http://localhost:3000/users', user).subscribe();
  }

  login(user: { email: string, password: string }) {
    return this.http.get('http://localhost:3000/users?email=' + user.email + '&password=' + user.password);
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }

  getUserById(id: number) {
    return this.http.get('http://localhost:3000/users?id=' + id);
  }

  saveUser() {
    localStorage.setItem('user', '' + this.user?.id);
  }

  getSavedUser() {
    return localStorage.getItem('user');
  }

  isUserConnected() {
    if (this.user) {
      this.saveUser();
      return true;
    } else if (this.getSavedUser()) {
      this.getSavedUserInfo().subscribe((user: any) => {
        this.user = user[0];
        return true;
      });
    }
    return false;
  }

  private getSavedUserInfo() {
    return this.http.get('http://localhost:3000/users?id=' + this.getSavedUser());
  }


}
