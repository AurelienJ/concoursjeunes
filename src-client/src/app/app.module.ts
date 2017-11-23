import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { BsDatepickerModule, defineLocale, TooltipModule, ModalModule, PopoverModule, TabsModule } from 'ngx-bootstrap';

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

@NgModule({
    imports:        [ BrowserModule,
        RouterModule.forRoot(AppRoutes, { useHash: true }),
        BsDatepickerModule.forRoot(), TooltipModule.forRoot(),
        ModalModule.forRoot(), PopoverModule.forRoot(), TabsModule.forRoot(),
        GeneralModule, ReferencesModule, AccountModule, ParametersModule, CompetitionModule, EntitesModule, PersonsModule, RulesModule],
    declarations:   [ AppComponent ],
    bootstrap:      [ AppComponent],
    providers:      [  ]
})
export class AppModule {
    constructor() {
        const fr = {
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
            ordinal: function (num: number, period: string) {
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
}
