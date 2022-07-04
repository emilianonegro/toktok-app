import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { WebsocketService } from '../../../../services/websocket.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public myform: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private wsService: WebsocketService
  ) {}

  getErrorMessage(field: string) {
    return (
      this.myform.controls[field].errors && this.myform.controls[field].touched
    );
  }

  register() {
    const { name, email, password } = this.myform.value;

    this.authService.register(name, email, password).subscribe(() => {
      this.router.navigateByUrl('/home');
      this.wsService.loginWS(name);
    });
  }
}
