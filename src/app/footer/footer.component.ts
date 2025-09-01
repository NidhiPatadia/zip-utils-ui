import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PAGE_TITLE } from '../enums/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  protected readonly TITLE = PAGE_TITLE;
  protected readonly currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }
}
