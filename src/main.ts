import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    // ✅ Umami – only in production
    if (environment.production) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://analytics.umami.is/script.js';
      script.setAttribute(
        'data-website-id',
        '1b7f47f6-fba3-4314-8e8d-613ec2b6a1c5'
      );

      document.head.appendChild(script);
    }
  })
  .catch((err) => console.error(err));
