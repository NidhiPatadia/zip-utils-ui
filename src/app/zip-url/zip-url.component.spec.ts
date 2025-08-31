import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipUrlComponent } from './zip-url.component';

describe('ZipUrlComponent', () => {
  let component: ZipUrlComponent;
  let fixture: ComponentFixture<ZipUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZipUrlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZipUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
