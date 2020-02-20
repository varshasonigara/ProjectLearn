import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.authService.login({
      username: this.f.username.value,
      password: this.f.password.value
    })
      .subscribe(success => {
        //navigate to home page
      });
  }
}
