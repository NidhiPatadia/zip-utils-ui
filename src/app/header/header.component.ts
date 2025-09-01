import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderService } from '../services/header/header.service';
import { CommonService } from '../services/common/common.service';
import { IHealthCheckResponse } from '../models/common';
import { ApolloQueryResult } from '@apollo/client/core/types';

enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private readonly isBrowser: boolean;
  private readonly commonService = inject(CommonService);
  private readonly headerService = inject(HeaderService);
  protected pageTitleAndDescription =
    this.headerService.pageTitleAndDescription;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.healthCheck();

    // if code is executing in browser then get theme from localStorage or user prefrence
    let theme = ThemeType.LIGHT;
    if (this.isBrowser) {
      const storedTheme = localStorage.getItem('theme') as ThemeType;
      theme = storedTheme || this.detectSystemTheme();
    }
    this.applyTheme(theme);
  }

  healthCheck() {
    this.commonService.healthCheck().subscribe({
      next: (response: ApolloQueryResult<IHealthCheckResponse>) => {
        if (response?.data?.healthCheck) {
          console.log('Server is healthy...');
        }
      },
      error: (err) => {
        const msg = 'Server is down. Please try again later.';
        console.error(msg, err);
        alert(msg);
      },
      complete: () => {
        console.log('Completed healthCheck call...');
      },
    });
  }

  private detectSystemTheme(): ThemeType {
    if (!this.isBrowser) return ThemeType.LIGHT;

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? ThemeType.DARK
      : ThemeType.LIGHT;
  }

  private applyTheme(theme: ThemeType) {
    if (!this.isBrowser) return;

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    if (!this.isBrowser) return;

    const current = document.documentElement.getAttribute(
      'data-theme',
    ) as ThemeType;

    this.applyTheme(
      current === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK,
    );
  }
}
