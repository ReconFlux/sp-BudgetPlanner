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
            for (let i = 0; i < DataSource.TransItems.length; i++) {
                let item = DataSource.TransItems[i];
                let category = (item.category || "");

                this._categories.push(category);
            }
        }
    };

    // Load Transactions
    private loadTransactions() {
        if (DataSource.TransItems) {
            for (let i = 0; i < DataSource.TransItems.length; i++) {
                let item = DataSource.TransItems[i];
                this._Transactions.push({
                    id: item.Id,
                    x: item.category,
                    y: item.amount,
                });
            }

        }
    };
    // Render
    private render(el: HTMLElement) {
        let _canvas = document.createElement("canvas");
        _canvas.id = "myChart";
        _canvas.width = 100;
        _canvas.height = 100;
        el.appendChild(_canvas);

        const ctx = _canvas.getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                // Check this
                labels: this._categories,
                datasets: [
                    {
                        label: "Car",
                        data: this._Transactions,
                        backgroundColor: "#000080"
                    }
                ]
            },
            options: {

                parsing: false,
                devicePixelRatio: 1,
                aspectRatio: 3,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                animation: false,
            }
        });

    }
}