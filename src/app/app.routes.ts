import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ZipTextComponent } from './zip-text/zip-text.component';
import { ZipTextViewerComponent } from './zip-text/text-viewer/text-viewer.component';
import { ZipUrlComponent } from './zip-url/zip-url.component';
import { ZipQrComponent } from './zip-qr/zip-qr.component';
import { SocialMetaResolver } from './resolvers/social-meta.resolver';
import { PAGE_TITLE, PAGE_DESCRIPTION } from './enums/common';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'text',
    component: ZipTextComponent,
    resolve: { social: SocialMetaResolver },
    data: {
      pageTitle: PAGE_TITLE.ZIP_TEXT,
      pageDescription: PAGE_DESCRIPTION.ZIP_TEXT,
      canonical: '/text',
    },
  },
  {
    path: 'url',
    component: ZipUrlComponent,
    resolve: { social: SocialMetaResolver },
    data: {
      pageTitle: PAGE_TITLE.ZIP_URL,
      pageDescription: PAGE_DESCRIPTION.ZIP_URL,
      canonical: '/url',
    },
  },
  {
    path: 'qr',
    component: ZipQrComponent,
    resolve: { social: SocialMetaResolver },
    data: {
      pageTitle: PAGE_TITLE.ZIP_QR,
      pageDescription: PAGE_DESCRIPTION.ZIP_QR,
      canonical: '/qr',
    },
  },
  {
    path: 't/:id',
    component: ZipTextViewerComponent,
  },
  {
    path: 'u/:id',
    component: ZipUrlComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
