import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderService } from '../services/header/header.service';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../enums/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly headerService = inject(HeaderService);
  protected readonly TITLE = PAGE_TITLE;
  protected readonly DESCRIPTION = PAGE_DESCRIPTION;

  ngOnInit(): void {
    this.headerService.setTitleAndDescription({
      pageTitle: PAGE_TITLE.ZIP_UTILS,
      pageDescription: PAGE_DESCRIPTION.ZIP_UTILS,
    });
  }
}
