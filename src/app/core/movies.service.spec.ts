/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MoviesService } from './movies.service';

describe('BusinessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviesService]
    });
  });

  it('should ...', inject([MoviesService], (service: MoviesService) => {
    expect(service).toBeTruthy();
  }));
});
