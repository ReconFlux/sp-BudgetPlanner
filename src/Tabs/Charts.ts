import Strings from "../strings";
import { Components } from "gd-sprest-bs";
import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, DataTable } from "dattatable";
import * as jQuery from "jquery";
import * as moment from "moment";
import Chart from 'chart.js/auto';
import { ArrayListener } from 'chart.js/helpers';
import { DataSource, ExpenseItem } from "../ds";


export class ChartsComponent {

    // Vars
    private _categories: Array<string> = null;
    private _Transactions: Array<any> = null;
    private _Totals: Array<any> = null;
    private _Header: Navigation = null;
    private _itemData: ExpenseItem = null;
    private _el: HTMLElement;
    private _Chart: Chart = null;

    // Constructor
    constructor(el: HTMLElement) {

        this._categories = [];
        this._Transactions = [];
        this._Totals = [];
        this.loadCategories();
        this.loadTransactions();
        this.render(el);
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
        if (DataSource.ExpenseItems) {
            for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
                let item = DataSource.ExpenseItems[i];
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


        for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
            let item = DataSource.ExpenseItems[i];
            this._Totals.push({
                amount: item.amount
            });
        }

        let sum: number = 0;
        let ExpensItems = DataSource.ExpenseItems;
        ExpensItems.forEach((item) => sum += item.amount);
        console.log(sum);
        let sumString = sum.toString();


        let headContainer = document.createElement("div");
        let _canvas = document.createElement("canvas");
        _canvas.id = "myChart";
        _canvas.width = 100;
        _canvas.height = 25;
        el.appendChild(_canvas);

        const ctx = _canvas.getContext('2d');

        this._Chart = new Chart(ctx, {
            type: 'bar',

            data: {
                // Check this
                labels: ["Mortage", "Internet", "Phone", "Car", "Utility", "Misc.", "Leisure", "Essentials"],
                datasets: [
                    {
                        label: 'Transactions',
                        data: this._Transactions,
                        backgroundColor: "#000080"
                    }
                ]
            },
            options: {
                animation: false,
                maintainAspectRatio: true,
                parsing: false,
                responsive: true,
                scales: {
                    y: {
                        stacked: true,
                        grid: {
                            display: true,
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });



        this._Header = new Navigation({
            el: headContainer,
            title: "Transactions Chart",
            hideFilter: true,
            hideSearch: true,
            onRendering: props => {
                props.type = Components.NavbarTypes.Light;
                props.id = "Chart_Header";
            },
            items: [
                {
                    text: "Total Expense:" + " " + sumString,
                    isDisabled: true,
                    isButton: false
                }
            ]
        });
        el.prepend(headContainer);
    }

    refresh() {
        console.log("CHART REFRESH HERE");
    }
}