import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsocketService } from '../../../../services/websocket.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public myform: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.minLength(6)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public wsService: WebsocketService,
    private authService: AuthService
  ) {}

  getErrorMessage(field: string) {
    return (
      this.myform.controls[field].errors && this.myform.controls[field].touched
    );
  }

  login() {
    const { email, password } = this.myform.value;
    this.authService.login(email, password).subscribe(() => {
      this.router.navigateByUrl('/home');
    });
  }
}
