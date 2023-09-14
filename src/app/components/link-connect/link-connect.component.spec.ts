import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkConnectComponent } from './link-connect.component';

describe('LinkConnectComponent', () => {
  let component: LinkConnectComponent;
  let fixture: ComponentFixture<LinkConnectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkConnectComponent]
    });
    fixture = TestBed.createComponent(LinkConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
