import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../../services/room.service';
import { WebsocketService } from '../../../services/websocket.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-input-change',
  templateUrl: './input-change.component.html',
  styleUrls: ['./input-change.component.css'],
})
export class InputChangeComponent implements OnInit {
  public myform: FormGroup = this.fb.group({
    newName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(14)],
    ],
  });
  public route = this.router.url || false;

  @Input() roomIdInput!: number;

  get rooms() {
    return this.roomService.rooms;
  }

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private router: Router,
    private wsService: WebsocketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  getErrorMessage(field: string) {
    return (
      this.myform.controls[field].errors && this.myform.controls[field].touched
    );
  }

  updateRoom() {
    if (this.myform.invalid) {
      this.myform.markAllAsTouched();
      return;
    }
    if (this.authService.isAdmin()) {
      let payload = {
        name: `${this.myform.controls['newName'].value}`,
        roomId: this.roomIdInput,
      };
      this.wsService.updateNameRoom(payload);
    }
  }
}
