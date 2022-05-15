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
    static ChartLabels = ["Monthly Expenses", "Monthly Net Differences", "Expense Categories", "Monthly Income", "Monthly Savings"]
    private _active: string = "active";
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
        ChartData.loadExpenseData();
        ChartData.loadIncomeData();
        ChartData.loadNETData();
        ChartData.loadExpenseCatelog();
    }


    // Refresh
    refresh() {
        console.log("Data Chart Refresh Method Called, clear the data is FIRST:");
        // Clear the data
        ChartData.ClearData().then(() => {
            // Grab the buttons
            let btn_Expenses = document.getElementById('btn_Expenses') as HTMLElement;
            let btn_NET = document.getElementById('btn_NET') as HTMLElement;
            let btn_catExp = document.getElementById('btn_catExp') as HTMLElement;

            // Grabs the latest and then updates the chart based on what button you selected
            DataSource.init().then(() => {

                this.loadData();
                // Checks the button state
                if (btn_Expenses.classList.contains(this._active)) {
                    this.switchtoMonthlyExp();
                    console.log("Monthly Expense Button is active, refreshes exp array");
                } else if (btn_NET.classList.contains(this._active)) {
                    this.switchtoNET();
                    console.log("NET Button si active, refreshes Net Data");
                } else if (btn_catExp.classList.contains(this._active)) {
                    this.switchtoCATExp();
                    console.log("Cat Exp button is active, refreshes Cat Exp Data");
                }

            });

            //     //this.loadData();
            //     this._datachart.update();


            // });
        });
    }


    // Updates Chart to NET data
    switchtoNET() {
        loadNetData(this._datachart, ChartData._NETDiff);
        this._datachart.update();
        console.log("switches to NET");
    }
    switchtoCATExp() {
        loadExpCATData(this._datachart, ChartData._CatelogArray);
        this._datachart.update();
        console.log("switches to CAT");
    }
    switchtoMonthlyExp() {
        loadMonthlyExp(this._datachart, ChartData._ExpenseSum);
        this._datachart.update();
        console.log("switches to Monthly");
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
                },
                scales: {
                    x: {
                        grid: { color: 'red', id: "X" }
                    },
                    y: {
                        grid: { color: 'red' }
                    }
                }
            }
        }

        function plugin(chart) {

        }

        const chartData = {
            datasets: [
                {
                    label: DATAChart.ChartLabels[0],
                    data: ChartData._ExpenseSum,
                    borderColor: 'rgba(255, 0, 0, 1)',
                    backgroundColor: 'rgba(109, 39, 39, 0.45)',
                    fill: true,
                    parsing: {
                        yAxisKey: 'amount',
                        xAxisKey: 'month'
                    }
                }
            ]
        }
        // Chart Container Props
        _canvas.id = "myChart";
        _canvas.width = 100;
        _canvas.height = 27;
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

        label: "Monthly Expenses",
        data: Mdata,
        borderColor: 'rgba(255, 0, 0, 1)',
        backgroundColor: 'rgba(109, 39, 39, 0.45)',
        fill: true,
        parsing: {
            yAxisKey: 'amount',
            xAxisKey: 'month'
        }
    });
    chart.update();
}
function loadNetData(chart, NetData) {

    DataSource.init().then(() => {

        chart.options.plugins.title.text = 'NET';
        chart.data.datasets.pop(NetData);
        chart.data.datasets.push({
            label: DATAChart.ChartLabels[1],
            data: NetData,
            borderColor: 'rgba(255, 0, 0, 1)',
            backgroundColor: 'rgba(109, 39, 39, 0.45)',
            fill: true,
            parsing: {
                yAxisKey: 'amount',
                xAxisKey: 'month'
            }
        });
        chart.update();
    });
}
function loadExpCATData(chart, CatData) {

    DataSource.init().then(() => {

        //ChartData._CatelogArray.length = 0;
        chart.options.plugins.title.text = 'Expense Catalog';
        chart.data.datasets.pop(CatData);
        chart.data.datasets.push({
            type: 'bar',
            label: DATAChart.ChartLabels[2],
            data: CatData,
            borderColor: 'rgba(255, 0, 0, 1)',
            backgroundColor: 'rgba(109, 39, 39, 0.45)',
            fill: true,
            parsing: {
                yAxisKey: 'amount',
                xAxisKey: 'category'
            }
        });
        chart.update();
    });
}
function loadMonthlyExp(chart, ExpData) {

    DataSource.init().then(() => {
        //ChartData._ExpenseSum.length = 0,
        chart.options.plugins.title.text = 'Monthly Expenses';
        chart.data.datasets.pop(ExpData);
        chart.data.datasets.push({
            label: DATAChart.ChartLabels[0],
            data: ExpData,
            borderColor: 'rgba(255, 0, 0, 1)',
            backgroundColor: 'rgba(109, 39, 39, 0.45)',
            fill: true,
            parsing: {
                yAxisKey: 'amount',
                xAxisKey: 'month'
            },
            options: {
                scales: {
                    x: {
                        grid: { color: 'red', id: "X" }
                    },
                    y: {
                        grid: { color: 'red' }
                    }
                }
            }
        });
        chart.update();
    });
}
