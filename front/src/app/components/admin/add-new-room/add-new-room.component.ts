import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsocketService } from 'src/app/services/websocket.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-new-room',
  templateUrl: './add-new-room.component.html',
  styleUrls: ['./add-new-room.component.css'],
})
export class AddNewRoomComponent implements OnInit {
  public myform: FormGroup = this.fb.group({
    roomName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(14)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private wsService: WebsocketService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {}

  getErrorMessage(field: string) {
    return (
      this.myform.controls[field].errors && this.myform.controls[field].touched
    );
  }

  add() {
    if (this.myform.invalid) {
      this.myform.markAllAsTouched();
      return;
    }
    if (this.authService.isAdmin()) {
      let payload = {
        name: `${this.myform.controls['roomName'].value}`,
      };
      this.wsService.emitEvent(payload);
    }
    this.myform.reset();
  }
}
