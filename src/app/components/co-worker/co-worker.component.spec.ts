import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkerComponent } from './co-worker.component';

describe('CoWorkerComponent', () => {
  let component: CoWorkerComponent;
  let fixture: ComponentFixture<CoWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
