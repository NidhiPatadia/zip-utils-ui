import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pin-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pin-modal.component.html',
  styleUrl: './pin-modal.component.css',
})
export class PinModalComponent implements AfterViewChecked {
  @Input() pinError = '';
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<string>();

  @ViewChild('pinInput') pinInput!: ElementRef<HTMLInputElement>;

  enteredPin = '';
  localError = '';
  private shouldFocus = false;
  private _showPinModal = false;

  get showPinModal(): boolean {
    return this._showPinModal;
  }

  @Input()
  set showPinModal(value: boolean) {
    this._showPinModal = value;
    if (value) {
      this.shouldFocus = true;
    }
  }

  ngAfterViewChecked() {
    if (this.shouldFocus && this.pinInput) {
      this.pinInput.nativeElement.focus();
      this.shouldFocus = false;
    }
  }

  onClose() {
    this.enteredPin = '';
    this.localError = '';
    this.close.emit();
  }

  onSubmit() {
    if (!this.enteredPin.trim()) {
      this.localError = 'Please enter a PIN';
      return;
    }
    this.localError = '';
    this.submit.emit(this.enteredPin);
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }
}
