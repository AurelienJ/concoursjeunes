import {Directive, Input, EventEmitter, SimpleChange, OnChanges, DoCheck} from "@angular/core";
import _ from 'lodash';


export interface SortEvent {
    sortBy: string|string[];
    sortOrder: string
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

    onDataChange : EventEmitter<DataEvent>;

    /**
     * Global size of array
     */
    size(): Promise<number>;

    /**
     * ordered source data
     */
    orderBy(sortBy: string|string[], sortOrder: string[]);

    /**
     * get part of data between start and end offset. Assume data index start at 0 number offset
     * 
     * @param {number} start - the start offset of data. must be null or >= 0 and < length. If null start at 0 offset
     * @param {number} end - the end offset of data. must be null or >= start and < length. If null end at length -1 offset
     * @return {any[]} The part of array between start and end offset
     */
    slice(start?: number, end?: number) : Promise<any[]>;
}

export class LocalInputData implements InputData {
    private sortBy: string|string[];
    private sortOrder: string[];

    public onDataChange : EventEmitter<DataEvent> = new EventEmitter<DataEvent>();

    constructor(private data : any[]) {
    }

    public size() : Promise<number> {
         return new Promise<number>((resolve, reject) => resolve(this.data.length));
    }

    public orderBy(sortBy: string|string[], sortOrder: string[]) {
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
    }

    public slice(start?: number, end?: number) : Promise<any[]> {
        if (typeof this.sortBy === 'string' || this.sortBy instanceof String) {
            this.data = _.orderBy(this.data, this.caseInsensitiveIteratee(<string>this.sortBy), this.sortOrder);
        } else {
            this.data = _.orderBy(this.data, this.sortBy, this.sortOrder);
        }

        let result = _.slice(this.data, start, end);

        return new Promise<any[]>((resolve, reject) => {
            return resolve(result);
        });
    }

    private caseInsensitiveIteratee(sortBy: string) {
        return (row: any): any => {
            var value = row;
            for (let sortByProperty of sortBy.split('.')){
                value = value[sortByProperty];
            }
            if (value && typeof value === 'string' || value instanceof String) {
                return value.toLowerCase();
            }
            return value;
        };
    }
}

@Directive({
    selector: 'table[mfData]',
    exportAs: 'mfDataTable'
})
export class DataTable implements OnChanges, DoCheck {

    /**
     * input data
     */
    @Input("mfData") public inputData: any[]|InputData = [];

    private dataSource : InputData;
    private dataLength : number = 0;

    private sortBy: string|string[] = "";
    private sortOrder = "asc";

    @Input("mfRowsOnPage") public rowsOnPage = 1000;
    @Input("mfActivePage") public activePage = 1;

    private mustRecalculateData = false;

    /**
     * Current active page data
     */
    public data: any[] = [];

    //public onDataChange = new EventEmitter<DataEvent>();
    public onDataReady = new EventEmitter<DataEvent>();
    public onSortChange = new EventEmitter<SortEvent>();
    public onPageChange = new EventEmitter<PageEvent>();

    private sizePromise : Promise<number>;

    /**
     * Get sort creteria an order
     * 
     * @return {SortEvent} The sort criteria
     */
    public getSort(): SortEvent {
        return {sortBy: this.sortBy, sortOrder: this.sortOrder};
    }

    /**
     * Define sort criteria and order
     * 
     * @param {string|string[]} sortBy - property or list of property use to sort data
     * @param {string} sortOrder - Must be "asc" for ascending sort or "desc" for descending sort
     */
    public setSort(sortBy: string|string[], sortOrder: string): void {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = sortOrder;
            this.mustRecalculateData = true;
            this.onSortChange.emit({sortBy: sortBy, sortOrder: sortOrder});
        }
    }

    /**
     * Return active page data (current page number, nb rows on page, and page data)
     * 
     * @return {PageEvent} - Page data
     */
    public getPage(): PageEvent {
        return {activePage: this.activePage, rowsOnPage: this.rowsOnPage, dataLength: this.dataLength};
    }

    /**
     * Define active page to display
     * 
     * @param {number} activePage - the active page number
     * @param {number} rowsOnPage - number of rows display on this page
     */
    public setPage(activePage: number, rowsOnPage: number): void {
        //page change only if size of page change or page number change
        if (this.rowsOnPage !== rowsOnPage || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ? activePage : this.calculateNewActivePage(this.rowsOnPage, rowsOnPage);
            this.rowsOnPage = rowsOnPage;
            this.mustRecalculateData = true;
            this.onPageChange.emit({
                activePage: this.activePage,
                rowsOnPage: this.rowsOnPage,
                dataLength: this.dataLength
            });
        }
    }

    private calculateNewActivePage(previousRowsOnPage: number, currentRowsOnPage: number): number {
        let firstRowOnPage = (this.activePage - 1) * previousRowsOnPage + 1;
        let newActivePage = Math.ceil(firstRowOnPage / currentRowsOnPage);
        return newActivePage;
    }

    private recalculatePage() {
        let lastPage = Math.ceil(this.dataLength / this.rowsOnPage);
        this.activePage = lastPage < this.activePage ? lastPage : this.activePage;
        this.activePage = this.activePage || 1;
    }

    private checkDataSize() : Promise<number> {
        this.sizePromise = this.dataSource.size().then(dataLength => {
                this.dataLength = dataLength;
                this.recalculatePage();
                this.onPageChange.emit({
                    activePage: this.activePage,
                    rowsOnPage: this.rowsOnPage,
                    dataLength: dataLength
                });
                this.mustRecalculateData = true;

                return dataLength;
            });
        return this.sizePromise;
    }

    /**
     * Event when source data change for refresh view
     */
    public ngOnChanges(changes: {[key: string]: SimpleChange}): any {
        if (changes["inputData"]) {
            this.inputData = changes["inputData"].currentValue || [];
            this.dataSource = this.getInputData();
            this.dataSource.onDataChange.subscribe(event => {
                this.checkDataSize();
            })
            return this.checkDataSize();
        }
    }

    public ngDoCheck(): any {
        let promiseData;
        if (this.mustRecalculateData) {
            promiseData = this.fillData();

            this.mustRecalculateData = false;
        }
        
        return promiseData;
    }

    private getInputData(): InputData {
        if(this.inputData instanceof Array) {
            return new LocalInputData(this.inputData);
        }

        return <InputData>this.inputData;
    }

    private fillData(): Promise<any[]> {
        this.activePage = this.activePage;
        this.rowsOnPage = this.rowsOnPage;

        let offset = (this.activePage - 1) * this.rowsOnPage;
        if(this.dataSource) {
            this.dataSource.orderBy(this.sortBy, [this.sortOrder]);
            return this.dataSource.slice(offset, offset + this.rowsOnPage).then(data => {
                this.data = data || [];
                this.onDataReady.emit({ length: this.data.length });

                return this.data;
            });
        }

        return new Promise<any[]>(resolve => resolve(this.data));
    }
}