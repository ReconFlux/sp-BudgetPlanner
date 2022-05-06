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
import { formatDateValue, getFieldValue } from "../common";


export class ChartsComponent {

    static MonthLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    static CategoryLabels = ["Mortage", "Internet", "Phone", "Car", "Utility", "Misc.", "Leisure", "Essentials"]
    // Vars
    private _ExpenseData: Array<any> = null;
    private _Totals: Array<any> = null;
    private _Sum = null;
    private _Header: Navigation = null;
    private _itemData: ExpenseItem = null;
    private _el: HTMLElement;

    // Expenses
    private _MortageData: Array<any> = null;
    private _InternetData: Array<any> = null;
    private _PhoneData: Array<any> = null;
    private _CarData: Array<any> = null;
    private _UtilityData: Array<any> = null;
    private _MiscData: Array<any> = null;
    private _LeisureData: Array<any> = null;
    private _Essentials: Array<any> = null;


    private _gchart = null;
    get GChart() { return this._gchart; }

    // Constructor
    constructor(el: HTMLElement) {

        this._ExpenseData = [];
        this._Totals = [];
        this.loadTransactions();
        this.render(el);

        this._MortageData = [];
        this._InternetData = [];
        this._PhoneData = [];
        this._CarData = [];
        this._UtilityData = [];
        this._MiscData = [];
        this._LeisureData = [];
        this._Essentials = [];

    }

    // Load Transactions
    private loadTransactions() {

        this._ExpenseData = [];
        this._MortageData = [];
        this._InternetData = [];
        this._PhoneData = [];
        this._CarData = [];
        this._UtilityData = [];
        this._MiscData = [];
        this._LeisureData = [];
        this._Essentials = [];

        DataSource.init().then(items => {

            if (DataSource.ExpenseItems) {

                for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
                    let item = DataSource.ExpenseItems[i];

                    let itemDate = getFieldValue("date", item);
                    let itemCategory = getFieldValue("category", item);
                    let itemAmount = getFieldValue("amount", item);


                    if (item.category == "Mortage") {
                        this._MortageData.push({
                            x: formatDateValue(itemDate),
                            y: itemAmount,
                            category: itemCategory
                        });
                        return this._MortageData;

                    }
                    console.log(this._MortageData);
                    // Mortgage Data






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
                addData(this._gchart, this._MortageData);
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

            datasets: [
                {

                    data: this._MortageData,
                    backgroundColor: "#000080",
                    parsing: {
                        yAxisKey: 'y',
                        xAxisKey: 'x'
                    }
                }
            ]
        }

        const options = {
            maintainAspectRatio: true,
            responsive: true,
        }

        // Chart Creation
        this._gchart = new Chart(ctx, {
            type: 'line',
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

        data: Mdata,
        backgroundColor: "#000080"
    });
    chart.update();
}