import Strings from "../../strings";
import { Components } from "gd-sprest-bs";
import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, DataTable } from "dattatable";
import * as jQuery from "jquery";
import * as moment from "moment";
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import { getRelativePosition } from 'chart.js/helpers';
import { ArrayListener } from 'chart.js/helpers';
import { DataSource, ExpenseItem } from "../../ds";
import { formatDateValue, getFieldValue } from "../../common";
import { ChartData } from "../ChartLogic";


export class DATAChart {

    // Vars
    static MonthLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    static CategoryLabels = ["Mortage", "Internet", "Phone", "Car", "Utility", "Misc.", "Leisure", "Essentials"]
    // private _Sum = null;
    private _Header: Navigation = null;
    private _el: HTMLElement;



    private _datachart = null;
    get DataChart() { return this._datachart; }

    // Constructor
    constructor(el: HTMLElement) {
        this.loadData();
        this.render(el);

    }
    // Load Data
    private loadData() {
        ChartData.loadJanuaryData();
        ChartData.loadFebruaryData();
        ChartData.loadMarchData();
        ChartData.loadAprilData();
        ChartData.loadMayData();
        console.log(ChartData._ExpenseSum);
    }


    // Refresh
    refresh() {
        console.log("Refreshes Chart");
        this.loadData();
        if (DataSource.ExpenseItems) {
            DataSource.init().then((items) => {
                addData(this._datachart, ChartData._ExpenseSum);
                this._datachart.update();
            });
        }
    }


    // Updates Chart to NET data
    switchtoNET() {
        loadNetData(this._datachart);
        this._datachart.update();
        console.log("switches Title");
    }
    switchtoCATExp() {
        loadExpCATData(this._datachart);
        this._datachart.update();
        console.log("switches Title");
    }
    switchtoMonthlyExp() {
        loadMonthlyExp(this._datachart);
        this._datachart.update();
        console.log("switches Title");
    }

    // Render Chart
    render(el: HTMLElement) {

        // Driv Creation
        let headContainer = document.createElement("div");
        let _canvas = document.createElement("canvas");

        // Constants ( for the chart )
        const options = {
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Expenses'
                }
            }
        }

        const chartData = {
            datasets: [
                {
                    label: "Expenses",
                    data: ChartData._ExpenseSum,
                    borderColor: 'rgba(255, 0, 0, 1)',
                    backgroundColor: 'rgba(109, 39, 39, 0.45)',
                    fill: true,
                    parsing: {
                        yAxisKey: 'sum',
                        xAxisKey: 'month'
                    }
                }
            ]
        }

        // Chart Container Props
        _canvas.id = "myChart";
        _canvas.width = 100;
        _canvas.height = 25;
        headContainer.appendChild(_canvas);
        el.appendChild(headContainer);
        // Chart Creation
        const ctx = _canvas.getContext('2d');

        // Chart Creation
        this._datachart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: options
        });
    }

}
// Add Data Function
function addData(chart, Mdata) {
    chart.data.datasets.pop();
    chart.data.datasets.push({

        label: "Expenses",
        data: Mdata,
        borderColor: 'rgba(255, 0, 0, 1)',
        backgroundColor: 'rgba(109, 39, 39, 0.45)',
        fill: true,
        parsing: {
            yAxisKey: 'sum',
            xAxisKey: 'month'
        }
    });
    chart.update();
}
function loadNetData(chart) {
    chart.options.plugins.title.text = 'NET';
    chart.update();
}
function loadExpCATData(chart) {
    chart.options.plugins.title.text = 'Expense Catalog';
    chart.update();
}
function loadMonthlyExp(chart) {
    chart.options.plugins.title.text = 'Monthly Expenses';
    chart.update();
}