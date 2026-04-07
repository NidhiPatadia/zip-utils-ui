import { Component, Input, OnDestroy, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css',
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input() expiryTime: number | null = null;
  @Input() isCreator = false;
  @Output() expired = new EventEmitter<void>();

  countdownDisplay = '';
  private countdownInterval: any = null;
  private remainingAtStart: number | null = null;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  startCountdown(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    if (!this.expiryTime) {
      this.countdownDisplay = '';
      return;
    }

    const circumference = 2 * Math.PI * 11;

    if (this.remainingAtStart === null) {
      const now = Math.floor(Date.now() / 1000);
      this.remainingAtStart = this.expiryTime - now;
    }

    const setRing = (ratio: number) => {
      const ring = document.querySelector('.mini-ring-fill') as SVGCircleElement;
      const badge = document.querySelector('.countdown-badge');
      if (ring) {
        ring.style.strokeDasharray = `${circumference}`;
        ring.style.strokeDashoffset = `${circumference * (1 - ratio)}`;
        
        const warn = ratio <= 0.5 && ratio > 0.25;
        const danger = ratio <= 0.25;
        ring.classList.toggle('warn', warn);
        ring.classList.toggle('danger', danger);
        if (badge) {
          badge.classList.toggle('warn', warn);
          badge.classList.toggle('danger', danger);
        }
      }
    };

    const tick = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = this.expiryTime! - now;

      if (remaining <= 0) {
        this.ngZone.run(() => {
          this.countdownDisplay = 'Expired';
          this.expired.emit();
        });
        if (this.countdownInterval) {
          clearInterval(this.countdownInterval);
          this.countdownInterval = null;
        }
        return;
      }

      const ratio = remaining / this.remainingAtStart!;
      setRing(ratio);

      this.ngZone.run(() => {
        const totalMinutes = Math.ceil(remaining / 60);

        if (totalMinutes <= 60) {
          const mins = Math.floor(remaining / 60);
          const secs = remaining % 60;
          this.countdownDisplay = `${mins}:${secs.toString().padStart(2, '0')}`;
        } else if (totalMinutes < 120) {
          this.countdownDisplay = `${totalMinutes} min`;
        } else {
          const hours = Math.floor(totalMinutes / 60);
          const mins = totalMinutes % 60;
          if (mins === 0) {
            this.countdownDisplay = `${hours}h`;
          } else {
            this.countdownDisplay = `${hours}h ${mins}m`;
          }
        }
      });
    };

    setRing(1);
    tick();

    const remaining = this.expiryTime! - Math.floor(Date.now() / 1000);
    if (remaining > 0) {
      if (remaining <= 3600) {
        this.countdownInterval = setInterval(tick, 1000);
      } else {
        this.countdownInterval = setInterval(tick, 60000);
      }
    }
  }
}