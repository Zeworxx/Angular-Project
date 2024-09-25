import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value).subscribe(
      (user:any) => {
        if (user.length === 0) return alert('Erreur dans le pseudo ou le mot de passe');
        this.authService.user = user[0];
        if(!this.authService.user) return;
        this.authService.saveUser();
        this.router.navigate(['/ticket-list/all']);
      },
      (error) => {
        alert('Erreur dans la requette');
      }
    );
  }



}
