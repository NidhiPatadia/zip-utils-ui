import { Component, inject, OnInit } from '@angular/core';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../enums/common';
import { HeaderService } from '../services/header/header.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent implements OnInit {
  private readonly headerService = inject(HeaderService);

  ngOnInit(): void {
    this.headerService.setTitleAndDescription({
      pageTitle: PAGE_TITLE.NOT_FOUND,
      pageDescription: PAGE_DESCRIPTION.NOT_FOUND,
    });
  }
}
