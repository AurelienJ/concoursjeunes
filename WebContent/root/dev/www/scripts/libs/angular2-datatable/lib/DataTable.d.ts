import { EventEmitter, SimpleChange, OnChanges, DoCheck } from "@angular/core";
export interface SortEvent {
    sortBy: string | string[];
    sortOrder: string;
}
export interface PageEvent {
    activePage: number;
    rowsOnPage: number;
    dataLength: number;
}
export interface DataEvent {
    length: number;
}
export interface InputData {
    onDataChange: EventEmitter<DataEvent>;
    size(): Promise<number>;
    orderBy(sortBy: string | string[], sortOrder: string[]): any;
    slice(start?: number, end?: number): Promise<any[]>;
}
export declare class LocalInputData implements InputData {
    private data;
    private sortBy;
    private sortOrder;
    onDataChange: EventEmitter<DataEvent>;
    constructor(data: any[]);
    size(): Promise<number>;
    orderBy(sortBy: string | string[], sortOrder: string[]): void;
    slice(start?: number, end?: number): Promise<any[]>;
    private caseInsensitiveIteratee(sortBy);
}
export declare class DataTable implements OnChanges, DoCheck {
    inputData: any[] | InputData;
    private dataSource;
    private dataLength;
    private sortBy;
    private sortOrder;
    rowsOnPage: number;
    activePage: number;
    private mustRecalculateData;
    data: any[];
    onDataReady: EventEmitter<DataEvent>;
    onSortChange: EventEmitter<SortEvent>;
    onPageChange: EventEmitter<PageEvent>;
    private sizePromise;
    getSort(): SortEvent;
    setSort(sortBy: string | string[], sortOrder: string): void;
    getPage(): PageEvent;
    setPage(activePage: number, rowsOnPage: number): void;
    private calculateNewActivePage(previousRowsOnPage, currentRowsOnPage);
    private recalculatePage();
    private checkDataSize();
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): any;
    ngDoCheck(): any;
    private getInputData();
    private fillData();
}
