import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoViewComponent } from './recurso-view.component';

describe('RecursoViewComponent', () => {
  let component: RecursoViewComponent;
  let fixture: ComponentFixture<RecursoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
