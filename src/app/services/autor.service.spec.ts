/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutorService } from './autor.service';

describe('Service: Autor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutorService]
    });
  });

  it('should ...', inject([AutorService], (service: AutorService) => {
    expect(service).toBeTruthy();
  }));
});
