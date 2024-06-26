import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { features } from 'node:process';
import { TOKEN_STORAGE_SERVICE } from './Services/injectionTokenStorageService';
import { SubjectStorageService } from './Services/subject-storage.service';

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
            provideRouter(routes,withViewTransitions()),
            provideClientHydration(),
            provideNzI18n(es_ES),
            importProvidersFrom(FormsModule),
            provideAnimationsAsync(),
            provideHttpClient(withFetch()),
            {provide: TOKEN_STORAGE_SERVICE, useClass: SubjectStorageService},

          ]
};
