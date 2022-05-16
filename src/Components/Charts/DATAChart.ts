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

/**
 * Chart
 */
export class DATAChart {

    // Vars
    private _el: HTMLElement = null;
    private _canvas: HTMLCanvasElement = null;
    private _datachart = null;

    // Chart
    get DataChart() { return this._datachart; }

    // Constructor
    constructor(el: HTMLElement, ExpData) {

        // Properties
        this._canvas = document.createElement("canvas");
        this._canvas.id = "myChart";
        this._canvas.width = 100;
        this._canvas.height = 35;

        // Load Data
        this.loadData();
        // Render
        this.render(el, ExpData)


    }

    // Load Data
    private loadData() {
        ChartData.LoadData().then(() => {
            ChartData.loadNETData();
        });

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
                if (btn_Expenses.classList.contains(Strings.isActive)) {
                    this.switchtoMonthlyExp();
                    console.log("Monthly Expense Button is active, refreshes exp array");
                } else if (btn_NET.classList.contains(Strings.isActive)) {
                    this.switchtoNET();
                    console.log("NET Button si active, refreshes Net Data");
                } else if (btn_catExp.classList.contains(Strings.isActive)) {
                    this.switchtoCATExp();
                    console.log("Cat Exp button is active, refreshes Cat Exp Data");
                }

            });

        });
    }

    // Updates Chart to NET data
    switchtoNET() {
        // console.log(ChartData._NETDiff);
        // loadNetData(this._datachart, ChartData._NETDiff);
        // this._datachart.update();
        // console.log("switches to NET");
    }
    switchtoCATExp() {
        loadExpCATData(this._datachart, ChartData._CatelogArray);
        this._datachart.update();
        console.log("switches to CAT");
    }
    switchtoMonthlyExp() {
        loadMonthlyExp(this._datachart, ChartData.ExpenseItems);
        this._datachart.update();
        console.log("switches to Monthly");
        console.log(ChartData.ExpenseItems);
    }

    private render(el: HTMLElement, ExpData) {
        let headContainer = document.createElement("div");
        el.appendChild(headContainer);
        headContainer.appendChild(this._canvas);


        const ctx = this._canvas.getContext('2d');
        let chartgradient = ctx.createLinearGradient(0, 0, 0, 300);
        chartgradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
        chartgradient.addColorStop(1, 'rgba(77, 0, 0, 0.1)');

        // Constants ( for the chart )
        const options = {
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    color: 'white',
                    text: 'Monthly Expenses'
                },
                legend: {
                    labels: {
                        color: 'white'
                    }
                }

            },
            scales: {
                x: {
                    ticks: { color: 'white' },
                    grid: { color: '#444' }
                },
                y: {
                    ticks: { color: 'white' },
                    grid: { color: '#444' }
                }
            }
        }
        const chartData = {
            datasets: [

                // Load the the Expense Data (since Monthly Expenses is loaded by default)
                {
                    label: Strings.ChartLabels[0],
                    data: ExpData,
                    borderColor: 'rgba(255, 0, 0, 1)',
                    backgroundColor: 'rgba(170, 0, 0, 1)',
                    fill: true,
                    parsing: {
                        yAxisKey: 'amount',
                        xAxisKey: 'month'
                    }
                }
            ]
        }

        this._datachart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: options
        });

    }
}
// Add Data Function
function loadNetData(chart, NetData) {

    DataSource.init().then(() => {

        chart.options.plugins.title.text = 'NET';
        chart.data.datasets.pop(NetData);
        chart.data.datasets.push({
            label: Strings.ChartLabels[1],
            data: NetData,
            borderColor: 'rgba(255, 0, 0, 1)',
            backgroundColor: 'rgba(170, 0, 0, 1)',
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
            label: Strings.ChartLabels[2],
            data: CatData,
            borderColor: 'rgba(255, 0, 0, 1)',
            backgroundColor: 'rgba(170, 0, 0, 1)',
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
            label: Strings.ChartLabels[0],
            data: ExpData,
            borderColor: 'rgba(255, 0, 0, 1)',
            backgroundColor: 'rgba(170, 0, 0, 1)',
            fill: true,
            parsing: {
                yAxisKey: 'amount',
                xAxisKey: 'month'
            },
            options: {
                scales: {
                    y: {
                        ticks: { color: 'white' },
                        grid: { color: '#444' }
                    },
                    x: {
                        ticks: { color: 'white' },
                        grid: { color: '#444' }
                    }
                }
            }
        });
        chart.update();
    });
}