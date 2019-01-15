import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { TrippageComponent } from "./trippage.component";
=======
import { TrippageComponent } from "./TrippageComponent";
>>>>>>> creating all the component for the trip page

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
