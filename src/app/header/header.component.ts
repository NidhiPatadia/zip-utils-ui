import { Component, OnInit } from '@angular/core';

enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    const storedTheme = localStorage.getItem('theme') as ThemeType;
    this.applyTheme(storedTheme || this.detectSystemTheme());
  }

  private detectSystemTheme(): ThemeType {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? ThemeType.DARK
      : ThemeType.LIGHT;
  }

  private applyTheme(theme: ThemeType) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute(
      'data-theme',
    ) as ThemeType;

    this.applyTheme(
      current === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK,
    );
  }
}
