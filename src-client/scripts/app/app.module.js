var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
///<reference path="_references.ts"/>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule, defineLocale, TooltipModule } from 'ngx-bootstrap';
import { GeneralModule } from './general/general.module';
import { ReferencesModule } from './references/references.module';
import { AccountModule } from "./account/account.module";
import { CompetitionModule } from './competitions/competitions.module';
import { EntitesModule } from './entites/entites.module';
import { PersonsModule } from './persons/persons.module';
import { RulesModule } from './rules/rules.module';
import { ParametersModule } from './parameters/parameters.module';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
var AppModule = /** @class */ (function () {
    function AppModule() {
        var fr = {
            abbr: 'fr',
            months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
            monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
            monthsParseExact: true,
            weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
            weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
            weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
            weekdaysParseExact: true,
            longDateFormat: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
            },
            calendar: {
                sameDay: '[Aujourd’hui à] LT',
                nextDay: '[Demain à] LT',
                nextWeek: 'dddd [à] LT',
                lastDay: '[Hier à] LT',
                lastWeek: 'dddd [dernier à] LT',
                sameElse: 'L'
            },
            relativeTime: {
                future: 'dans %s',
                past: 'il y a %s',
                s: 'quelques secondes',
                m: 'une minute',
                mm: '%d minutes',
                h: 'une heure',
                hh: '%d heures',
                d: 'un jour',
                dd: '%d jours',
                M: 'un mois',
                MM: '%d mois',
                y: 'un an',
                yy: '%d ans'
            },
            dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
            ordinal: function (num, period) {
                switch (period) {
                    // TODO: Return 'e' when day of month > 1. Move this case inside
                    // block for masculine words below.
                    // See https://github.com/moment/moment/issues/3375
                    case 'D':
                        return num + (num === 1 ? 'er' : '');
                    // Words with masculine grammatical gender: mois, trimestre, jour
                    default:
                    case 'M':
                    case 'Q':
                    case 'DDD':
                    case 'd':
                        return num + (num === 1 ? 'er' : 'e');
                    // Words with feminine grammatical gender: semaine
                    case 'w':
                    case 'W':
                        return num + (num === 1 ? 're' : 'e');
                }
            },
            week: {
                dow: 1,
                doy: 4 // The week that contains Jan 4th is the first week of the year.
            }
        };
        defineLocale('fr', fr);
    }
    AppModule = __decorate([
        NgModule({
            imports: [BrowserModule,
                RouterModule.forRoot(AppRoutes, { useHash: true }),
                BsDatepickerModule.forRoot(), TooltipModule.forRoot(),
                GeneralModule, ReferencesModule, AccountModule, ParametersModule, CompetitionModule, EntitesModule, PersonsModule, RulesModule],
            declarations: [AppComponent],
            bootstrap: [AppComponent],
            providers: []
        }),
        __metadata("design:paramtypes", [])
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map