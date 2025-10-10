import { Component, inject, OnInit } from '@angular/core';
import { CommonService } from '../services/common/common.service';
import { FormsModule } from '@angular/forms';
import { HeaderService } from '../services/header/header.service';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../enums/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zip-text',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './zip-text.component.html',
  styleUrl: './zip-text.component.css',
})
export class ZipTextComponent implements OnInit {
  private readonly headerService = inject(HeaderService);
  private readonly commonService = inject(CommonService);
  private readonly router = inject(Router);

  textInput: string = '';
  expiryInMinutes: number = 10;

  ngOnInit(): void {
    this.headerService.setTitleAndDescription({
      pageTitle: PAGE_TITLE.ZIP_TEXT,
      pageDescription: PAGE_DESCRIPTION.ZIP_TEXT,
    });
  }

  generateLink() {
    if (!this.textInput.trim()) return;
    this.commonService.setTempText(this.textInput);
    this.commonService.generateZipTextUrl(this.textInput, parseInt(this.expiryInMinutes.toString(), 10)).subscribe({
      next: (response) => {
        const id = response.data?.generateZipTextUrl;
        if (id) {
          this.router.navigate(['/t', id]);
        }
      },
      error: (err) => console.error('Error generating link', err),
    });
  }
}
