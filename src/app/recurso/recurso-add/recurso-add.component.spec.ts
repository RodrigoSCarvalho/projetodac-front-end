import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoAddComponent } from './recurso-add.component';

describe('RecursoAddComponent', () => {
  let component: RecursoAddComponent;
  let fixture: ComponentFixture<RecursoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
