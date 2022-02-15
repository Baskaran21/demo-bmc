import { TestBed } from '@angular/core/testing';

import { APIconnectService } from './apiconnect.service';

describe('APIconnectService', () => {
  let service: APIconnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIconnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
