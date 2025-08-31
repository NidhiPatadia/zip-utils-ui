import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipTextComponent } from './zip-text.component';

describe('ZipTextComponent', () => {
  let component: ZipTextComponent;
  let fixture: ComponentFixture<ZipTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZipTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZipTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
