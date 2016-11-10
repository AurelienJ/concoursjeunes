///<reference path="../_references.ts"/>
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationStart, Event as NavigationEvent, UrlSegment } from '@angular/router';
import { NavigationSnapshot } from '../models/NavigationSnapshot';

import 'rxjs/add/operator/filter';
import {Observable} from 'rxjs/Observable';

import * as Rx from 'rxjs/Rx'

@Injectable()
export class NavigatorService {
    public navigationStack : NavigationSnapshot[] = [];
    //public navigationStack$ : Observable<NavigationSnapshot[]>;

    constructor(private router : Router, private route: ActivatedRoute, private location : Location) {
    }

    public push(snapshot : NavigationSnapshot) {
        this.navigationStack.push(snapshot);
    }

    public pop() {
        return this.navigationStack.pop();
    }

    public pushUrlSegments(label : string, url : UrlSegment[], queryParams : any) {
        let urlSnapshot = new NavigationSnapshot(label, url, queryParams, null);
        let currentTopUrl = this.getCurrentNavigationSnapshot();
        let previousUrl = this.getPreviousNavigationSnapshot();
        if(previousUrl && previousUrl.toPathString() == urlSnapshot.toPathString())
            this.pop();
        else if(!currentTopUrl || currentTopUrl.toPathString() != urlSnapshot.toPathString())
            this.push(urlSnapshot)
    }

    public clear() {
        this.navigationStack = [];
    }

    public clearAfter(index : number) {
        this.navigationStack.length = index+1;
    }

    public goBack(router : Router, returnData : any, index : number) {
        if(!index) {
            let previousView = this.getPreviousNavigationSnapshot();
            previousView.returnData = returnData;
            this.pop();

            router.navigate(previousView.path, { queryParams: previousView.queryParams });
        } else {
            if(index < 0)
                index = this.navigationStack.length - 1 + index;
                
            if(index >= 0 && index < this.navigationStack.length) {
                let indexView = this.navigationStack[index];
                if(indexView) {
                    indexView.returnData = returnData;
                    this.navigationStack.length = index+1;

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