///<reference path="../_references.ts"/>
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationStart, Event as NavigationEvent, UrlSegment } from '@angular/router';
import { NavigationSnapshot } from './NavigationSnapshot';

import 'rxjs/add/operator/filter';
import {Observable} from 'rxjs/Observable';

import * as Rx from 'rxjs/Rx'

@Injectable()
export class NavigatorService {
    public navigationStack : NavigationSnapshot[] = [];
    //public navigationStack$ : Observable<NavigationSnapshot[]>;

    private onChangesListeners : Array<(navigationSnapshots : NavigationSnapshot[]) => void> = [];

    constructor(private router : Router, private route: ActivatedRoute, private location : Location) {
    }

    public push(snapshot : NavigationSnapshot) {
        this.navigationStack.push(snapshot);

        this.onChange();
    }

    public pop() {
        let item = this.navigationStack.pop();

        this.onChange();

        return item;
    }

    public pushUrlSegments(label : string, url : UrlSegment[], queryParams : any) {
        let urlSnapshot = new NavigationSnapshot(label, url, queryParams, null);
        let currentTopUrl = this.getCurrentNavigationSnapshot();
        let previousUrl = this.getPreviousNavigationSnapshot();
        if(previousUrl && previousUrl.toPathString() == urlSnapshot.toPathString())
            this.pop();
        else if(!currentTopUrl || currentTopUrl.toPathString() != urlSnapshot.toPathString())
            this.push(urlSnapshot);

        this.onChange();
    }

    public subscribe(fn : (navigationSnapshots : NavigationSnapshot[]) => void) {
        this.onChangesListeners.push(fn);
    }

    public unsubscribe(fn : (navigationSnapshots : NavigationSnapshot[]) => void) {
        let i = this.onChangesListeners.indexOf(fn);
        if (i > -1) {
            this.onChangesListeners.splice(i, 1);
        }
    }

    private onChange() {
        for (let handler of this.onChangesListeners) {
            handler(this.navigationStack);
        }
    }

    public clear() {
        this.navigationStack = [];

         this.onChange();
    }

    public clearAfter(index : number) {
        this.navigationStack.length = index+1;

        this.onChange();
    }

    public goBack(router : Router, returnData : any, returnDataType : string, index : number) {
        if(!index) {
            let previousView = this.getPreviousNavigationSnapshot();
            previousView.returnData = returnData;
            previousView.returnDataType = returnDataType;
            this.pop();

            router.navigate(previousView.path, { queryParams: previousView.queryParams });
        } else {
            if(index < 0)
                index = this.navigationStack.length - 1 + index;
                
            if(index >= 0 && index < this.navigationStack.length) {
                let indexView = this.navigationStack[index];
                if(indexView) {
                    indexView.returnData = returnData;
                    indexView.returnDataType = returnDataType;
                    this.navigationStack.length = index+1;

                    this.onChange();

                    router.navigate(indexView.path, { queryParams: indexView.queryParams } );
                }
            }
        }
    }

    /**
     * Retourne le point de navigation courant
     */
    public getCurrentNavigationSnapshot() {
        if(this.navigationStack && this.navigationStack.length > 0)
            return this.navigationStack[this.navigationStack.length-1];

        return null;
    }

    /**
     * Retourne le point de navigation précédent
     */
    public getPreviousNavigationSnapshot() {
        if(this.navigationStack && this.navigationStack.length > 1)
            return this.navigationStack[this.navigationStack.length-2];

        return null;
    }
}