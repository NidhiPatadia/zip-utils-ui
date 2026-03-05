import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { HeaderService } from '../services/header/header.service';

@Injectable({ providedIn: 'root' })
export class SocialMetaResolver implements Resolve<boolean> {
  constructor(private meta: Meta, private headerService: HeaderService) {}

  resolve(route: ActivatedRouteSnapshot): boolean {
    const data = route.data;

    const title = data['pageTitle'];
    const description = data['pageDescription'];
    const canonicalPath = data['canonical'];
    const tabTitle = data['tabTitle'];

    if (title) {
      this.meta.updateTag({ property: 'og:title', content: title });
    }

    if (description) {
      this.meta.updateTag({ property: 'og:description', content: description });
    }

    if (tabTitle && description) {
      this.headerService.setTitleAndDescription({
        pageTitle: tabTitle,
        pageDescription: description,
      });
    }

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Zip-Utils' });

    if (canonicalPath) {
      const url =
        canonicalPath === '/'
          ? environment.angularUrl
          : `${environment.angularUrl}${canonicalPath}`;

      this.meta.updateTag({ property: 'og:url', content: url });
    }

    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    if (title) {
      this.meta.updateTag({ name: 'twitter:title', content: title });
    }

    if (description) {
      this.meta.updateTag({
        name: 'twitter:description',
        content: description,
      });
    }

    return true;
  }
}
