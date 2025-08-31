import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '../services/header/header.service';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../enums/common';

@Component({
  selector: 'app-zip-url',
  standalone: true,
  imports: [],
  templateUrl: './zip-url.component.html',
  styleUrl: './zip-url.component.css',
})
export class ZipUrlComponent implements OnInit {
  private readonly headerService = inject(HeaderService);

  ngOnInit(): void {
    this.headerService.setTitleAndDescription({
      pageTitle: PAGE_TITLE.ZIP_URL,
      pageDescription: PAGE_DESCRIPTION.ZIP_URL,
    });
  }
}
