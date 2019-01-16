import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupuserComponent } from './groupuser.component';

describe('GroupuserComponent', () => {
  let component: GroupuserComponent;
  let fixture: ComponentFixture<GroupuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
