import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrippageComponent } from './trippage.component';

describe('TrippageComponent', () => {
  let component: TrippageComponent;
  let fixture: ComponentFixture<TrippageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrippageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrippageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
