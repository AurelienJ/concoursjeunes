System.register(["@angular/core", "lodash"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, lodash_1, LocalInputData, DataTable;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            LocalInputData = /** @class */ (function () {
                function LocalInputData(data) {
                    this.data = data;
                    this.onDataChange = new core_1.EventEmitter();
                }
                LocalInputData.prototype.size = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) { return resolve(_this.data.length); });
                };
                LocalInputData.prototype.orderBy = function (sortBy, sortOrder) {
                    this.sortBy = sortBy;
                    this.sortOrder = sortOrder;
                };
                LocalInputData.prototype.slice = function (start, end) {
                    if (typeof this.sortBy === 'string' || this.sortBy instanceof String) {
                        this.data = lodash_1.default.orderBy(this.data, this.caseInsensitiveIteratee(this.sortBy), this.sortOrder);
                    }
                    else {
                        this.data = lodash_1.default.orderBy(this.data, this.sortBy, this.sortOrder);
                    }
                    var result = lodash_1.default.slice(this.data, start, end);
                    return new Promise(function (resolve, reject) {
                        return resolve(result);
                    });
                };
                LocalInputData.prototype.caseInsensitiveIteratee = function (sortBy) {
                    return function (row) {
                        var value = row;
                        for (var _i = 0, _a = sortBy.split('.'); _i < _a.length; _i++) {
                            var sortByProperty = _a[_i];
                            value = value[sortByProperty];
                        }
                        if (value && typeof value === 'string' || value instanceof String) {
                            return value.toLowerCase();
                        }
                        return value;
                    };
                };
                return LocalInputData;
            }());
            exports_1("LocalInputData", LocalInputData);
            DataTable = /** @class */ (function () {
                function DataTable() {
                    /**
                     * input data
                     */
                    this.inputData = [];
                    this.dataLength = 0;
                    this.sortBy = "";
                    this.sortOrder = "asc";
                    this.rowsOnPage = 1000;
                    this.activePage = 1;
                    this.mustRecalculateData = false;
                    /**
                     * Current active page data
                     */
                    this.data = [];
                    //public onDataChange = new EventEmitter<DataEvent>();
                    this.onDataReady = new core_1.EventEmitter();
                    this.onSortChange = new core_1.EventEmitter();
                    this.onPageChange = new core_1.EventEmitter();
                }
                /**
                 * Get sort creteria an order
                 *
                 * @return {SortEvent} The sort criteria
                 */
                DataTable.prototype.getSort = function () {
                    return { sortBy: this.sortBy, sortOrder: this.sortOrder };
                };
                /**
                 * Define sort criteria and order
                 *
                 * @param {string|string[]} sortBy - property or list of property use to sort data
                 * @param {string} sortOrder - Must be "asc" for ascending sort or "desc" for descending sort
                 */
                DataTable.prototype.setSort = function (sortBy, sortOrder) {
                    if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
                        this.sortBy = sortBy;
                        this.sortOrder = sortOrder;
                        this.mustRecalculateData = true;
                        this.onSortChange.emit({ sortBy: sortBy, sortOrder: sortOrder });
                    }
                };
                /**
                 * Return active page data (current page number, nb rows on page, and page data)
                 *
                 * @return {PageEvent} - Page data
                 */
                DataTable.prototype.getPage = function () {
                    return { activePage: this.activePage, rowsOnPage: this.rowsOnPage, dataLength: this.dataLength };
                };
                /**
                 * Define active page to display
                 *
                 * @param {number} activePage - the active page number
                 * @param {number} rowsOnPage - number of rows display on this page
                 */
                DataTable.prototype.setPage = function (activePage, rowsOnPage) {
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
                };
                DataTable.prototype.calculateNewActivePage = function (previousRowsOnPage, currentRowsOnPage) {
                    var firstRowOnPage = (this.activePage - 1) * previousRowsOnPage + 1;
                    var newActivePage = Math.ceil(firstRowOnPage / currentRowsOnPage);
                    return newActivePage;
                };
                DataTable.prototype.recalculatePage = function () {
                    var lastPage = Math.ceil(this.dataLength / this.rowsOnPage);
                    this.activePage = lastPage < this.activePage ? lastPage : this.activePage;
                    this.activePage = this.activePage || 1;
                };
                DataTable.prototype.checkDataSize = function () {
                    var _this = this;
                    this.sizePromise = this.dataSource.size().then(function (dataLength) {
                        _this.dataLength = dataLength;
                        _this.recalculatePage();
                        _this.onPageChange.emit({
                            activePage: _this.activePage,
                            rowsOnPage: _this.rowsOnPage,
                            dataLength: dataLength
                        });
                        _this.mustRecalculateData = true;
                        return dataLength;
                    });
                    return this.sizePromise;
                };
                /**
                 * Event when source data change for refresh view
                 */
                DataTable.prototype.ngOnChanges = function (changes) {
                    var _this = this;
                    if (changes["inputData"]) {
                        this.inputData = changes["inputData"].currentValue || [];
                        this.dataSource = this.getInputData();
                        this.dataSource.onDataChange.subscribe(function (event) {
                            _this.checkDataSize();
                        });
                        return this.checkDataSize();
                    }
                };
                DataTable.prototype.ngDoCheck = function () {
                    var promiseData;
                    if (this.mustRecalculateData) {
                        promiseData = this.fillData();
                        this.mustRecalculateData = false;
                    }
                    return promiseData;
                };
                DataTable.prototype.getInputData = function () {
                    if (this.inputData instanceof Array) {
                        return new LocalInputData(this.inputData);
                    }
                    return this.inputData;
                };
                DataTable.prototype.fillData = function () {
                    var _this = this;
                    this.activePage = this.activePage;
                    this.rowsOnPage = this.rowsOnPage;
                    var offset = (this.activePage - 1) * this.rowsOnPage;
                    if (this.dataSource) {
                        this.dataSource.orderBy(this.sortBy, [this.sortOrder]);
                        return this.dataSource.slice(offset, offset + this.rowsOnPage).then(function (data) {
                            _this.data = data || [];
                            _this.onDataReady.emit({ length: _this.data.length });
                            return _this.data;
                        });
                    }
                    return new Promise(function (resolve) { return resolve(_this.data); });
                };
                __decorate([
                    core_1.Input("mfData"),
                    __metadata("design:type", Object)
                ], DataTable.prototype, "inputData", void 0);
                __decorate([
                    core_1.Input("mfRowsOnPage"),
                    __metadata("design:type", Object)
                ], DataTable.prototype, "rowsOnPage", void 0);
                __decorate([
                    core_1.Input("mfActivePage"),
                    __metadata("design:type", Object)
                ], DataTable.prototype, "activePage", void 0);
                DataTable = __decorate([
                    core_1.Directive({
                        selector: 'table[mfData]',
                        exportAs: 'mfDataTable'
                    })
                ], DataTable);
                return DataTable;
            }());
            exports_1("DataTable", DataTable);
        }
    };
});

//# sourceMappingURL=DataTable.js.map
