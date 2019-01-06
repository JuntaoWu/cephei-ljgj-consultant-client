import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogModalComponent } from './backlog-modal.component';

describe('BacklogModalComponent', () => {
  let component: BacklogModalComponent;
  let fixture: ComponentFixture<BacklogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
