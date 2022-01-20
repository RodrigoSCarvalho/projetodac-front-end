/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecursoService } from './recurso.service';

describe('Service: Recurso', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecursoService]
    });
  });

  it('should ...', inject([RecursoService], (service: RecursoService) => {
    expect(service).toBeTruthy();
  }));
});
