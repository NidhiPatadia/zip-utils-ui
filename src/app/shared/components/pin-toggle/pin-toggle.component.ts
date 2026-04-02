import { Component, forwardRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-pin-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pin-toggle.component.html',
  styleUrl: './pin-toggle.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PinToggleComponent),
      multi: true,
    },
  ],
})
export class PinToggleComponent implements ControlValueAccessor {
  pinEnabled = false;
  pinValue = '';
  pinError = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.pinValue = value || '';
    this.pinEnabled = !!value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('click')
  onPinToggleClick(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    this.pinEnabled = !this.pinEnabled;
    
    if (!this.pinEnabled) {
      this.pinValue = '';
      this.pinError = '';
      this.onChange('');
    } else {
      setTimeout(() => {
        const input = document.getElementById('pinInput');
        if (input) {
          input.focus();
        }
      }, 320);
    }
    
    this.onTouched();
  }

  onPinInputChange() {
    const cleaned = this.pinValue.replace(/\D/g, '');
    if (this.pinValue !== cleaned) {
      this.pinValue = cleaned;
      const input = document.getElementById('pinInput') as HTMLInputElement;
      if (input) {
        input.value = cleaned;
      }
    }
    this.clearPinError();
    this.onChange(this.pinValue);
  }

  onKeyDown(event: KeyboardEvent) {
    if (
      event.key !== 'Backspace' &&
      event.key !== 'Tab' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight' &&
      event.key !== 'Delete' &&
      event.key !== 'Enter' &&
      event.ctrlKey === false &&
      event.metaKey === false
    ) {
      if (/^[a-zA-Z]$/.test(event.key)) {
        event.preventDefault();
      }
    }
  }

  validatePin(): string | null {
    if (!this.pinEnabled) {
      return null;
    }
    if (this.pinValue === '') {
      return 'PIN is required';
    }
    if (this.pinValue.length < 4) {
      return 'At least 4 digits required';
    }
    return null;
  }

  isValid(): boolean {
    const error = this.validatePin();
    return error === null;
  }

  clearPinError() {
    this.pinError = '';
  }

  showPinError(text: string) {
    this.pinError = text;
  }
}
