import { TestBed } from '@angular/core/testing';

import { ContohserviceService } from './contohservice.service';

describe('ContohserviceService', () => {
  let service: ContohserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContohserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
