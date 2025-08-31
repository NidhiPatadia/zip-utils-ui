import { Component, inject, OnInit } from '@angular/core';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../enums/common';
import { HeaderService } from '../services/header/header.service';

@Component({
  selector: 'app-zip-qr',
  standalone: true,
  imports: [],
  templateUrl: './zip-qr.component.html',
  styleUrl: './zip-qr.component.css',
})
export class ZipQrComponent implements OnInit {
  private readonly headerService = inject(HeaderService);

  ngOnInit(): void {
    this.headerService.setTitleAndDescription({
      pageTitle: PAGE_TITLE.ZIP_QR,
      pageDescription: PAGE_DESCRIPTION.ZIP_QR,
    });
  }
}
