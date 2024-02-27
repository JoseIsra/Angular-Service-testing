import { TestBed } from '@angular/core/testing';

import { WomanService } from './woman.service';

describe('WomanService', () => {
  let service: WomanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WomanService],
    });
    service = TestBed.inject(WomanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getWomanName method', () => {
    it('Debe retornar "Belen"', () => {
      expect(service.getWomanName()).toBe('Belen');
    });
  });
});
