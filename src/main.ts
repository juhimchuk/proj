import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { CalendarsModule } from './modules/calendars/calendar.module';
import { LoginsModule } from './modules/logins/login.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
platformBrowserDynamic().bootstrapModule(CalendarsModule).catch(err => console.error(err));
platformBrowserDynamic().bootstrapModule(LoginsModule);