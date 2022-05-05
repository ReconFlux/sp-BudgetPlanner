import Strings from "../strings";
import { Components } from "gd-sprest-bs";
import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, DataTable } from "dattatable";
import * as jQuery from "jquery";
import * as moment from "moment";
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import { getRelativePosition } from 'chart.js/helpers';
import { ArrayListener } from 'chart.js/helpers';
import { DataSource, ExpenseItem } from "../ds";


export class ChartsComponent {

    static ExpenseLabels = ["Mortage", "Internet", "Phone", "Car", "Utility", "Misc.", "Leisure", "Essentials"]

    // Vars
    private _Transactions: Array<any> = null;
    private _Totals: Array<any> = null;
    private _Sum = null;
    private _Header: Navigation = null;
    private _itemData: ExpenseItem = null;
    private _el: HTMLElement;


    private _gchart = null;
    get GChart() { return this._gchart; }

    // Constructor
    constructor(el: HTMLElement) {

        this._Transactions = [];
        this._Totals = [];
        this.loadTransactions();
        this.render(el);
    }

    // Load Transactions
    private loadTransactions() {
        this._Transactions = [];
        DataSource.init().then(items => {
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
        });

    };

    refresh() {
        this.loadTransactions();
        console.log("Refreshes Chart");
        this.getSum();
        if (DataSource.ExpenseItems) {
            DataSource.init().then((items) => {
                addData(this._gchart, this._Transactions);
                this._gchart.update();
            });
        }
    }


    private getSum() {
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
        this._Sum = sum.toString();
    }


    // Render
    private render(el: HTMLElement) {

        this.getSum();
        let headContainer = document.createElement("div");
        let _canvas = document.createElement("canvas");
        _canvas.id = "myChart";
        _canvas.width = 100;
        _canvas.height = 25;
        el.appendChild(_canvas);

        const ctx = _canvas.getContext('2d');

        const chartData = {
            labels: ChartsComponent.ExpenseLabels,
            datasets: [{
                label: 'Transactions',
                data: this._Transactions,
                backgroundColor: "#000080"
            }]
        }

        const options = {
            maintainAspectRatio: true,
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

        // Chart Creation
        this._gchart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: options
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
                    text: "Total Expense:" + " " + this._Sum,
                    isDisabled: true,
                    isButton: false
                }
            ]
        });
        el.prepend(headContainer);
    }
}

function addData(chart, Mdata) {
    chart.data.datasets.pop();
    chart.data.datasets.push({
        label: "Transactions",
        data: Mdata,
        backgroundColor: "#000080"
    });
    chart.update();
}