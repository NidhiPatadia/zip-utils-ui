import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bot-guard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './bot-guard.component.html',
  styleUrl: './bot-guard.component.css',
})
export class BotGuardComponent implements OnInit {
  private startTime = Date.now();
  private userInteracted = false;
  private jsEnabled = true;

  honeypots: { name: string; value: string }[] = [];

  ngOnInit(): void {
    this.createHoneypots();
    this.detectUserInteraction();
  }

  private createHoneypots(): void {
    this.honeypots = Array.from({ length: 3 }).map(() => ({
      name: `hp_${Math.random().toString(36).slice(2, 10)}`,
      value: '',
    }));
  }

  private detectUserInteraction(): void {
    const markInteraction = () => (this.userInteracted = true);
    ['mousemove', 'keydown', 'touchstart', 'scroll'].forEach((event) => {
      window.addEventListener(event, markInteraction, { once: true });
    });
  }

  validate(): { valid: boolean; reason?: string } {
    const timeTaken = Date.now() - this.startTime;

    // JS execution check
    if (!this.jsEnabled) {
      return { valid: false, reason: 'JS disabled' };
    }

    // Minimum time check (3 seconds)
    if (timeTaken < 3000) {
      return { valid: false, reason: 'Submitted too fast' };
    }

    // User interaction check
    if (!this.userInteracted) {
      return { valid: false, reason: 'No user interaction detected' };
    }

    // Honeypot check
    for (const field of this.honeypots) {
      if (field.value.trim()) {
        return { valid: false, reason: 'Bot detected (hidden field filled)' };
      }
    }

    return { valid: true };
  }
}
