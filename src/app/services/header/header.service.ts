import { Injectable, signal } from '@angular/core';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../../enums/common';
import { IPageTitleAndDescription } from '../../models/common';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private readonly _pageTitleAndDescription = signal<IPageTitleAndDescription>({
    pageTitle: PAGE_TITLE.ZIP_UTILS,
    pageDescription: PAGE_DESCRIPTION.ZIP_UTILS,
  });

  constructor(
    private title: Title,
    private meta: Meta,
  ) {}

  readonly pageTitleAndDescription = this._pageTitleAndDescription.asReadonly();

  setTitleAndDescription(pageTitleAndDescription: IPageTitleAndDescription) {
    // Update signal
    this._pageTitleAndDescription.set(pageTitleAndDescription);

    // Update browser tab title
    this.title.setTitle(pageTitleAndDescription.tabTitle ?? pageTitleAndDescription.pageTitle);

    // Update meta title tag
    this.meta.updateTag({
      name: 'title',
      content: pageTitleAndDescription.pageTitle,
    });

    // Update meta description (SEO + social sharing)
    this.meta.updateTag({
      name: 'description',
      content: pageTitleAndDescription.pageDescription,
    });
  }

  setCanonical(path: string) {
    const normalizedPath = (path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`);
    const canonicalUrl = `${environment.angularUrl}${normalizedPath}`;

    let link = document.querySelector(
      "link[rel='canonical']"
    ) as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    link.setAttribute('href', canonicalUrl);
  }
}
