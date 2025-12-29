import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ZipTextComponent } from './zip-text/zip-text.component';
import { ZipTextViewerComponent } from './zip-text/text-viewer/text-viewer.component';
import { ZipUrlComponent } from './zip-url/zip-url.component';
import { ZipQrComponent } from './zip-qr/zip-qr.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'text',
    component: ZipTextComponent,
  },
  {
    path: 'url',
    component: ZipUrlComponent,
  },
  {
    path: 'qr',
    component: ZipQrComponent,
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
