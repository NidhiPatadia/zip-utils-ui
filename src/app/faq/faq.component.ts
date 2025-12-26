import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  @Input() title = 'Frequently Asked Questions';
  @Input() items: FaqItem[] = [];

  openIndex: number | null = null;

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
