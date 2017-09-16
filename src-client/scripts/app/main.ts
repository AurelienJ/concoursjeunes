///<reference path="_references.ts"/>

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import {enableProdMode} from '@angular/core';

// @if DEBUG = false
enableProdMode();
// @endif

platformBrowserDynamic().bootstrapModule(AppModule);