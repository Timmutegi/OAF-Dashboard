import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  isLoading: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.api.login('/Admins/login', this.loginForm.value).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('token', res.id);
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      }
    );
  }
}
