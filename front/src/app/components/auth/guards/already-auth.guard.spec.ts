import { TestBed } from '@angular/core/testing';

import { AlreadyAuthGuard } from './already-auth.guard';

describe('AlreadyAuthGuard', () => {
  let guard: AlreadyAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlreadyAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
