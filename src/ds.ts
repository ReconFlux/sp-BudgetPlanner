import { Components, Types, Web } from "gd-sprest-bs";
import Strings from "./strings";
import { ChartData } from "./Components/ChartLogic";

// All Items
export interface TransItem extends Types.SP.ListItem {
    date: string;
    amount: number;
    category: string;
}

// Break down each interface by category

// Income
export interface IncomeItem extends Types.SP.ListItem {
    date: string;
    amount: number;
    category: string;
}

// Expense (Everything except Income combined)
export interface ExpenseItem extends Types.SP.ListItem {
    date: string;
    amount: number;
    category: string;
}


/**
 * Data Source
 */
export class DataSource {
    // category Filters
    private static _categoryFilters: Components.ICheckboxGroupItem[] = null;
    static get categoryFilters(): Components.ICheckboxGroupItem[] { return this._categoryFilters; }
    static loadcategoryFilters(): PromiseLike<Components.ICheckboxGroupItem[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the category field
            Web(Strings.SourceUrl).Lists(Strings.Lists.Main).Fields("category").execute((fld: Types.SP.FieldChoice) => {
                let items: Components.ICheckboxGroupItem[] = [];

                // Parse the choices
                for (let i = 0; i < fld.Choices.results.length; i++) {
                    // Add an item
                    items.push({
                        label: fld.Choices.results[i],
                        type: Components.CheckboxGroupTypes.Switch
                    });
                }

                // Set the filters and resolve the promise
                this._categoryFilters = items;
                resolve(items);
            }, reject);
        });
    }

    // Gets the item id from the query string
    static getItemIdFromQS() {
        // Get the id from the querystring
        let qs = document.location.search.split('?');
        qs = qs.length > 1 ? qs[1].split('&') : [];
        for (let i = 0; i < qs.length; i++) {
            let qsItem = qs[i].split('=');
            let key = qsItem[0];
            let value = qsItem[1];

            // See if this is the "id" key
            if (key == "ID") {
                // Return the item
                return parseInt(value);
            }
        }
    }

    // Initializes the application
    static init(): PromiseLike<void> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Clear the chart data
            ChartData.ClearData().then(() => {
                // Load the data
                this.loadTransItems().then(() => {
                    // Load the category filters
                    this.loadcategoryFilters().then(() => {
                        this.loadIncomeItems().then(() => {
                            this.loadExpenseItems().then(() => {
                                ChartData.LoadData().then(() => {
                                    // Resolve the request
                                    resolve();
                                }, reject);
                            }, reject);
                        }, reject);
                    }, reject);
                }, reject);
            }, reject);
        });
    }

    // Loads the list data
    private static _TransItems: TransItem[] = null;
    static get TransItems(): TransItem[] { return this._TransItems; }
    static loadTransItems(): PromiseLike<TransItem[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Load the data
            Web(Strings.SourceUrl).Lists(Strings.Lists.Main).Items().query({
                GetAllItems: true,
                OrderBy: ["category"],
                Top: 5000,
            }).execute(
                // Success
                items => {
                    // Set the items
                    this._TransItems = items.results as any;

                    // Resolve the request
                    resolve(this._TransItems);
                },
                // Error
                () => { reject(); }
            );
        });
    }

    // Loads the Income data
    private static _IncomeItem: IncomeItem[] = null;
    static get IncomeItems(): IncomeItem[] { return this._IncomeItem; }
    static loadIncomeItems(): PromiseLike<IncomeItem[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Load the data
            Web(Strings.SourceUrl).Lists(Strings.Lists.Main).Items().query({
                GetAllItems: true,
                OrderBy: ["category"],
                Filter: "category eq 'Income'",
                Top: 5000,
            }).execute(
                // Success
                items => {
                    // Set the items
                    this._IncomeItem = items.results as any;

                    // Resolve the request
                    resolve(this._IncomeItem);
                },
                // Error
                () => { reject(); }
            );
        });
    }



    // Loads the Expense data
    private static _ExpenseItem: ExpenseItem[] = null;
    static get ExpenseItems(): ExpenseItem[] { return this._ExpenseItem; }
    static loadExpenseItems(): PromiseLike<ExpenseItem[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Load the data
            Web(Strings.SourceUrl).Lists(Strings.Lists.Main).Items().query({
                GetAllItems: true,
                OrderBy: ["category"],
                Filter: "category ne 'Income'",
                Top: 5000,
            }).execute(
                // Success
                items => {
                    // Set the items
                    this._ExpenseItem = items.results as any;

                    // Resolve the request
                    resolve(this._ExpenseItem);
                },
                // Error
                () => { reject(); }
            );
        });
    }
}