import Strings from "../strings";
import { Components } from "gd-sprest-bs";
import * as jQuery from "jquery";
import * as moment from "moment";
import Chart from 'chart.js/auto';
import { ArrayListener } from 'chart.js/helpers';
import { DataSource, TransItem } from "../ds";


export class ChartsTab {
    // Vars
    private _categories: Array<string> = null;
    private _Transactions: Array<any> = null;
    // Constructor
    constructor(el: HTMLElement) {
        this.render(el);
        this._categories = [];
        this._Transactions = [];
        this.loadCategories();
        this.loadTransactions();
    }
    // Load Categories Labels
    private loadCategories() {
        this._categories = [];
        if (DataSource.TransItems) {

        }
    };

    // Load Transactions
    private loadTransactions() { };
    // Render
    private render(el: HTMLElement) {
    }
}