import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoViewComponent } from './evento-view.component';

describe('EventoViewComponent', () => {
  let component: EventoViewComponent;
  let fixture: ComponentFixture<EventoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
