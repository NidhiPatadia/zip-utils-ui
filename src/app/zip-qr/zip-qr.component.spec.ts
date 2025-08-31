import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipQrComponent } from './zip-qr.component';

describe('ZipQrComponent', () => {
  let component: ZipQrComponent;
  let fixture: ComponentFixture<ZipQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZipQrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZipQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
