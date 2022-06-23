import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputChangeComponent } from './input-change.component';

describe('InputChangeComponent', () => {
  let component: InputChangeComponent;
  let fixture: ComponentFixture<InputChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
