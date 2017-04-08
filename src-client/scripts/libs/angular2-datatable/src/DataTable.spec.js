System.register(["@angular/core", "./DataTable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, DataTable_1;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (DataTable_1_1) {
                DataTable_1 = DataTable_1_1;
            }
        ],
        execute: function () {
            describe("DataTable directive tests", function () {
                var datatable;
                var originalTimeout;
                beforeEach(function (done) {
                    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
                    var testPromise = new Promise(function (resolve, reject) {
                        datatable = new DataTable_1.DataTable();
                        datatable.inputData = [
                            { id: 3, name: 'banana' },
                            { id: 1, name: 'Duck' },
                            { id: 2, name: 'ącki' },
                            { id: 5, name: 'Ðrone' },
                            { id: 4, name: 'Ananas' }
                        ];
                        datatable.ngOnChanges({ inputData: new core_1.SimpleChange(null, datatable.inputData, true) })
                            .then(function (number) { return resolve(number); });
                    }).then(function () { return done(); });
                });
                afterEach(function () {
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
                });
                describe("initializing", function () {
                    it("data should be empty array if inputData is undefined or null", function () {
                        var datatable = new DataTable_1.DataTable();
                        datatable.ngOnChanges({ inputData: new core_1.SimpleChange(null, null, true) });
                        datatable.ngDoCheck();
                        expect(datatable.data).toEqual([]);
                    });
                    it("data should be equal to inputData", function (done) {
                        datatable.ngDoCheck()
                            .then(function () {
                            if (datatable.inputData instanceof Array)
                                expect(datatable.data).toEqual(datatable.inputData);
                            else
                                fail("must be an array");
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                    it("data should be 2 first items", function (done) {
                        datatable.rowsOnPage = 2;
                        datatable.ngDoCheck()
                            .then(function () {
                            expect(datatable.data).toEqual([{ id: 3, name: 'banana' }, { id: 1, name: 'Duck' }]);
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                    it("data should be 3. and 4. items", function (done) {
                        datatable.rowsOnPage = 2;
                        datatable.activePage = 2;
                        datatable.ngDoCheck()
                            .then(function () {
                            expect(datatable.data).toEqual([{ id: 2, name: 'ącki' }, { id: 5, name: 'Ðrone' }]);
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                    it("shouldn't recalculate data when no changes", function () {
                        datatable.ngDoCheck();
                        var data = datatable.data;
                        datatable.ngOnChanges({});
                        datatable.ngDoCheck();
                        expect(datatable.data).toBe(data);
                    });
                });
                describe("pagination", function () {
                    beforeEach(function (done) {
                        datatable.rowsOnPage = 2;
                        datatable.ngDoCheck()
                            .then(function () {
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                    it("should return current page settings", function () {
                        expect(datatable.getPage()).toEqual({ activePage: 1, rowsOnPage: 2, dataLength: 5 });
                    });
                    it("data should be 3. and 4. items when page change", function (done) {
                        datatable.setPage(2, 2);
                        datatable.ngDoCheck()
                            .then(function () {
                            expect(datatable.data).toEqual([{ id: 2, name: 'ącki' }, { id: 5, name: 'Ðrone' }]);
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                    it("data should be three first items when page change", function (done) {
                        datatable.setPage(1, 3);
                        datatable.ngDoCheck()
                            .then(function () {
                            expect(datatable.data).toEqual([{ id: 3, name: 'banana' }, { id: 1, name: 'Duck' }, { id: 2, name: 'ącki' }]);
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                    it("data should be two last items when page change", function (done) {
                        datatable.setPage(2, 3);
                        datatable.setPage(2, 3);
                        datatable.ngDoCheck()
                            .then(function () {
                            expect(datatable.data).toEqual([{ id: 5, name: 'Ðrone' }, { id: 4, name: 'Ananas' }]);
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                });
                describe("sorting", function () {
                    it("id should return current sort setting", function () {
                        datatable.setSort("id", "desc");
                        expect(datatable.getSort()).toEqual({ sortBy: "id", sortOrder: "desc" });
                    });
                    it("shouldn't refresh data when set page with same settings", function (done) {
                        datatable.setSort("name", "asc");
                        datatable.ngDoCheck()
                            .then(function () {
                            var data = datatable.data;
                            datatable.setSort("name", "asc");
                            datatable.ngDoCheck();
                            expect(datatable.data).toBe(data);
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                    it("should sort data ascending by name", function (done) {
                        datatable.setSort("name", "asc");
                        datatable.ngDoCheck()
                            .then(function () {
                            expect(datatable.data).toEqual([
                                { id: 4, name: 'Ananas' },
                                { id: 3, name: 'banana' },
                                { id: 1, name: 'Duck' },
                                { id: 5, name: 'Ðrone' },
                                { id: 2, name: 'ącki' }
                            ]);
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                    it("should sort data descending by id", function (done) {
                        datatable.setSort("id", "desc");
                        datatable.ngDoCheck()
                            .then(function () {
                            expect(datatable.data).toEqual([
                                { id: 5, name: 'Ðrone' },
                                { id: 4, name: 'Ananas' },
                                { id: 3, name: 'banana' },
                                { id: 2, name: 'ącki' },
                                { id: 1, name: 'Duck' }
                            ]);
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                    it("should sort data by two values", function (done) {
                        var newData = [
                            { name: 'Claire', age: 9 },
                            { name: 'Anna', age: 34 },
                            { name: 'Claire', age: 16 },
                            { name: 'Claire', age: 7 },
                            { name: 'Anna', age: 12 }
                        ];
                        datatable.ngOnChanges({ inputData: new core_1.SimpleChange(datatable.inputData, newData, true) });
                        datatable.setSort(['name', 'age'], "asc");
                        datatable.ngDoCheck()
                            .then(function () {
                            expect(datatable.data).toEqual([
                                { name: 'Anna', age: 12 },
                                { name: 'Anna', age: 34 },
                                { name: 'Claire', age: 7 },
                                { name: 'Claire', age: 9 },
                                { name: 'Claire', age: 16 }
                            ]);
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                    it("should sort data by child property value", function (done) {
                        var newData = [
                            { name: 'Claire', city: { zip: '51111' } },
                            { name: 'Anna', city: { zip: '31111' } },
                            { name: 'Claire', city: { zip: '41111' } },
                            { name: 'Claire', city: { zip: '11111' } },
                            { name: 'Anna', city: { zip: '21111' } }
                        ];
                        datatable.ngOnChanges({ inputData: new core_1.SimpleChange(datatable.inputData, newData, true) });
                        datatable.setSort("city.zip", "asc");
                        datatable.ngDoCheck()
                            .then(function () {
                            expect(datatable.data).toEqual([
                                { name: 'Claire', city: { zip: '11111' } },
                                { name: 'Anna', city: { zip: '21111' } },
                                { name: 'Anna', city: { zip: '31111' } },
                                { name: 'Claire', city: { zip: '41111' } },
                                { name: 'Claire', city: { zip: '51111' } },
                            ]);
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                });
                describe("data change", function () {
                    it("should change data", function (done) {
                        var newData = [{ id: 5, name: 'Ðrone' }, { id: 4, name: 'Ananas' }];
                        datatable.ngOnChanges({ inputData: new core_1.SimpleChange(datatable.inputData, newData, true) });
                        datatable.ngDoCheck()
                            .then(function () {
                            expect(datatable.data).toEqual([{ id: 5, name: 'Ðrone' }, { id: 4, name: 'Ananas' }]);
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                    it("should change page when no data on current page", function (done) {
                        datatable.setPage(2, 2);
                        datatable.ngDoCheck();
                        var newData = [{ id: 5, name: 'Ðrone' }, { id: 4, name: 'Ananas' }];
                        datatable.ngOnChanges({ inputData: new core_1.SimpleChange(datatable.inputData, newData, true) })
                            .then(function () {
                            datatable.ngDoCheck()
                                .then(function () {
                                expect(datatable.data).toEqual(newData);
                                done();
                            })
                                .catch(function (error) {
                                fail("Error: " + error);
                                done();
                            });
                        });
                    });
                    it("shouldn't change page when can display data", function (done) {
                        datatable.setPage(2, 1);
                        datatable.ngDoCheck();
                        var newData = [{ id: 5, name: 'Ðrone' }, { id: 1, name: 'Duck' }, { id: 4, name: 'Ananas' }];
                        datatable.ngOnChanges({ inputData: new core_1.SimpleChange(datatable.inputData, newData, true) });
                        datatable.ngDoCheck()
                            .then(function () {
                            expect(datatable.data).toEqual([{ id: 1, name: 'Duck' }]);
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                    it("shouldn't change page to 0 when data is empty", function (done) {
                        datatable.setPage(2, 1);
                        datatable.ngDoCheck();
                        var newData = [];
                        datatable.ngOnChanges({ inputData: new core_1.SimpleChange(datatable.inputData, newData, true) });
                        datatable.ngDoCheck()
                            .then(function () {
                            expect(datatable.activePage).toEqual(1);
                            done();
                        })
                            .catch(function (error) {
                            fail("Error: " + error);
                            done();
                        });
                    });
                });
            });
        }
    };
});

//# sourceMappingURL=DataTable.spec.js.map
