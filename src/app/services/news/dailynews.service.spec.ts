import { TestBed, inject } from '@angular/core/testing';

import { DailynewsService } from './dailynews.service';

describe('DailynewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailynewsService]
    });
  });

  it('should be created', inject([DailynewsService], (service: DailynewsService) => {
    expect(service).toBeTruthy();
  }));
});
