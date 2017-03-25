///<reference path="_references.ts"/>
import {SimpleChange} from "@angular/core";
import {DataTable, InputData } from "./DataTable";

describe("DataTable directive tests", ()=> {
    let datatable: DataTable;
    let originalTimeout;

    beforeEach((done)=> {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

        let testPromise = new Promise((resolve,reject) => {
            datatable = new DataTable();
            datatable.inputData = [
                {id: 3, name: 'banana'},
                {id: 1, name: 'Duck'},
                {id: 2, name: 'ącki'},
                {id: 5, name: 'Ðrone'},
                {id: 4, name: 'Ananas'}
            ];
            datatable.ngOnChanges({inputData: new SimpleChange(null, datatable.inputData, true)})
                .then(number => resolve(number));
        }).then(() => done());
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    describe("initializing", ()=> {

        it("data should be empty array if inputData is undefined or null", () => {
            let datatable = new DataTable();
            datatable.ngOnChanges({inputData: new SimpleChange(null, null, true)});
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([]);
        });

        it("data should be equal to inputData", (done)=> {
            datatable.ngDoCheck()
                .then(() => {
                    expect(datatable.data).toEqual(<any[]>datatable.inputData);
                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });
        });

        it("data should be 2 first items", (done)=> {
            datatable.rowsOnPage = 2;
            datatable.ngDoCheck()
                .then(() => {
                    expect(datatable.data).toEqual([{id: 3, name: 'banana'}, {id: 1, name: 'Duck'}]);
                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });
            
        });

        it("data should be 3. and 4. items", (done)=> {
            datatable.rowsOnPage = 2;
            datatable.activePage = 2;
            datatable.ngDoCheck()
                .then(() => {
                    expect(datatable.data).toEqual([{id: 2, name: 'ącki'}, {id: 5, name: 'Ðrone'}]);
                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });
        });

        it("shouldn't recalculate data when no changes", ()=> {
            datatable.ngDoCheck();
            let data = datatable.data;
            datatable.ngOnChanges({});
            datatable.ngDoCheck();
            expect(datatable.data).toBe(data);
        });
    });

    describe("pagination", ()=> {

        beforeEach((done)=> {
            datatable.rowsOnPage = 2;
            datatable.ngDoCheck()
                .then(() => {
                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });
        });

        it("should return current page settings", ()=> {
            expect(datatable.getPage()).toEqual({activePage: 1, rowsOnPage: 2, dataLength: 5});
        });

        it("data should be 3. and 4. items when page change", (done)=> {
            datatable.setPage(2, 2);
            datatable.ngDoCheck()
                .then(() => {
                    expect(datatable.data).toEqual([{id: 2, name: 'ącki'}, {id: 5, name: 'Ðrone'}]);
                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });
        });

        it("data should be three first items when page change", (done)=> {
            datatable.setPage(1, 3);
            datatable.ngDoCheck()
                .then(() => {
                    expect(datatable.data).toEqual([{id: 3, name: 'banana'}, {id: 1, name: 'Duck'}, {id: 2, name: 'ącki'}]);
                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });
            
        });

        it("data should be two last items when page change", (done)=> {
            datatable.setPage(2, 3);
            datatable.setPage(2, 3);
            datatable.ngDoCheck()
                .then(() => {
                    expect(datatable.data).toEqual([{id: 5, name: 'Ðrone'}, {id: 4, name: 'Ananas'}]);
                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });
        });
    });

    describe("sorting", ()=> {

        it("id should return current sort setting", () => {
            datatable.setSort("id", "desc");
            expect(datatable.getSort()).toEqual({sortBy: "id", sortOrder: "desc"});
        });

        it("shouldn't refresh data when set page with same settings", (done)=> {
            datatable.setSort("name", "asc");
            datatable.ngDoCheck()
                .then(() => {
                    let data = datatable.data;
                    datatable.setSort("name", "asc");
                    datatable.ngDoCheck();
                    expect(datatable.data).toBe(data);

                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });
           
        });

        it("should sort data ascending by name", (done)=> {
            datatable.setSort("name", "asc");
            datatable.ngDoCheck()
                .then(() => {
                    expect(datatable.data).toEqual([
                        {id: 4, name: 'Ananas'},
                        {id: 3, name: 'banana'},
                        {id: 1, name: 'Duck'},
                        {id: 5, name: 'Ðrone'},
                        {id: 2, name: 'ącki'}
                    ]);
                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });
        });

        it("should sort data descending by id", (done)=> {
            datatable.setSort("id", "desc");
            datatable.ngDoCheck()
                .then(() => {
                    expect(datatable.data).toEqual([
                        {id: 5, name: 'Ðrone'},
                        {id: 4, name: 'Ananas'},
                        {id: 3, name: 'banana'},
                        {id: 2, name: 'ącki'},
                        {id: 1, name: 'Duck'}
                    ]);
                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });
        });

        it("should sort data by two values", (done)=> {
            let newData = [
                {name: 'Claire', age: 9},
                {name: 'Anna', age: 34},
                {name: 'Claire', age: 16},
                {name: 'Claire', age: 7},
                {name: 'Anna', age: 12}
            ];
            datatable.ngOnChanges({inputData: new SimpleChange(datatable.inputData, newData, true)});
            datatable.setSort(['name', 'age'], "asc");
            datatable.ngDoCheck()
                .then(() => {
                    expect(datatable.data).toEqual([
                        {name: 'Anna', age: 12},
                        {name: 'Anna', age: 34},
                        {name: 'Claire', age: 7},
                        {name: 'Claire', age: 9},
                        {name: 'Claire', age: 16}
                    ]);
                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });

            
        });

        it("should sort data by child property value", (done)=>{
            let newData = [
                {name: 'Claire', city: { zip: '51111'}},
                {name: 'Anna', city: { zip: '31111'}},
                {name: 'Claire', city: { zip: '41111'}},
                {name: 'Claire', city: { zip: '11111'}},
                {name: 'Anna', city: { zip: '21111'}}
            ];
            datatable.ngOnChanges({inputData: new SimpleChange(datatable.inputData, newData, true)});
            datatable.setSort("city.zip", "asc");
            datatable.ngDoCheck()
                .then(() => {
                     expect(datatable.data).toEqual([
                        {name: 'Claire', city: { zip: '11111'}},
                        {name: 'Anna', city: { zip: '21111'}},
                        {name: 'Anna', city: { zip: '31111'}},
                        {name: 'Claire', city: { zip: '41111'}},
                        {name: 'Claire', city: { zip: '51111'}},
                    ]);
                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });
        });
    });

    describe("data change", ()=> {
        it("should change data", (done)=> {
            let newData = [{id: 5, name: 'Ðrone'}, {id: 4, name: 'Ananas'}];
            datatable.ngOnChanges({inputData: new SimpleChange(datatable.inputData, newData, true)});
            datatable.ngDoCheck()
                .then(() => {
                    expect(datatable.data).toEqual([{id: 5, name: 'Ðrone'}, {id: 4, name: 'Ananas'}]);
                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });
        });

        it("should change page when no data on current page", (done)=> {
            datatable.setPage(2, 2);
            datatable.ngDoCheck();

            let newData = [{id: 5, name: 'Ðrone'}, {id: 4, name: 'Ananas'}];
            datatable.ngOnChanges({inputData: new SimpleChange(datatable.inputData, newData, true)})
                .then(() => {
                    datatable.ngDoCheck()
                        .then(() => {
                            expect(datatable.data).toEqual(newData);
                            done();
                        })
                        .catch(error => {
                            fail("Error: " + error);
                            done();
                        });
                });
            
        });

        it("shouldn't change page when can display data", (done)=> {
            datatable.setPage(2, 1);
            datatable.ngDoCheck();

            let newData = [{id: 5, name: 'Ðrone'}, {id: 1, name: 'Duck'}, {id: 4, name: 'Ananas'}];
            datatable.ngOnChanges({inputData: new SimpleChange(datatable.inputData, newData, true)});
            datatable.ngDoCheck()
                .then(() => {
                    expect(datatable.data).toEqual([{id: 1, name: 'Duck'}]);
                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });
            
        });

        it("shouldn't change page to 0 when data is empty", (done)=> {
            datatable.setPage(2, 1);
            datatable.ngDoCheck();

            let newData = [];
            datatable.ngOnChanges({inputData: new SimpleChange(datatable.inputData, newData, true)});
            datatable.ngDoCheck()
                .then(() => {
                    expect(datatable.activePage).toEqual(1);
                    done();
                })
                .catch(error => {
                    fail("Error: " + error);
                    done();
                });
            
        });
    });
});