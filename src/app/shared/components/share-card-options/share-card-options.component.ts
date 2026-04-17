import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-share-card-options',
  standalone: true,
  imports: [CommonModule, DeleteModalComponent],
  templateUrl: './share-card-options.component.html',
  styleUrl: './share-card-options.component.css',
})
export class ShareCardOptionsComponent {
  @Input() isOneTimeView = false;
  @Input() hasPin = false;
  @Input() isCreator = true;
  @Input() showDeleteOption = false;
  @Input() showWarnings = true;
  @Input() currentUrl = '';

  @Output() onDelete = new EventEmitter<void>();

  showDeleteModal = false;

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    this.showDeleteModal = false;
    this.onDelete.emit();
  }
}
