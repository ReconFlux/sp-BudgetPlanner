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
import { App } from "../../app";

/**
 * Chart
 */
export class DATAChart {

    // Vars
    private _el: HTMLElement = null;
    private static _canvas: HTMLCanvasElement = null;
    private _datachart = null;
    private static _gridColor: string = null;
    private static _tickColor: string = null;
    private static _scaleGridColor: string = null;
    private static _titleColor: string = null;
    private static _labelColor: string = null;
    private _isDarkMode: boolean = null;

    // Chart stuff
    get DataChart() { return this._datachart; }
    static get Canvas() { return DATAChart._canvas; }
    static get CTX() { return DATAChart._canvas.getContext('2d'); }

    //Color getters
    static get GridColor() { return this._gridColor; }
    static get TickColor() { return this._tickColor; }
    static get ScaleColor() { return this._scaleGridColor; }
    static get TitleColor() { return this._titleColor; }
    static get LabelColor() { return this._labelColor; }

    // Constructor
    constructor(el: HTMLElement) {

        // Properties
        DATAChart._canvas = document.createElement("canvas");
        DATAChart._canvas.id = "myChart";
        DATAChart._canvas.width = 100;
        DATAChart._canvas.height = 35;

        this.checkTheme();

        // Render
        this.render(el);


    }


    // Refresh
    refresh() {
        console.log("Data Chart Refresh Method Called");

        // Grab the buttons
        let btn_Expenses = document.getElementById('btn_Expenses') as HTMLElement;
        let btn_NET = document.getElementById('btn_NET') as HTMLElement;
        let btn_catExp = document.getElementById('btn_catExp') as HTMLElement;

        // Grabs the latest and then updates the chart based on what button you selected

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


    }

    // Updates Chart to NET data
    switchtoNET() {
        ChartData.loadNETData();
        console.log(ChartData.NETDiffItems);
        loadNetData(this._datachart, ChartData.NETDiffItems);
        this._datachart.update();
        console.log("switches to NET");
    }
    switchtoCATExp() {
        loadExpCATData(this._datachart, ChartData.CatelogItems);
        this._datachart.update();
        console.log("switches to CAT");
    }
    switchtoMonthlyExp() {
        loadMonthlyExp(this._datachart, ChartData.ExpenseItems);
        this._datachart.update();
        console.log("switches to Monthly");
        console.log(ChartData.ExpenseItems);
    }

    static themecheck() {
        window.matchMedia("(prefers-color-scheme: dark)");
    }

    // Checks light/dark mode
    private checkTheme() {

        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

        const setTheme = event => {

            if (event.matches) {
                // Theme set to dark.
                DATAChart._gridColor = 'rgba(255, 100, 100, 1)';
                DATAChart._titleColor = 'rgba(255, 255, 255, 1)';
                DATAChart._labelColor = 'rgba(255, 255, 255, 1)';
                DATAChart._tickColor = 'rgba(255, 255, 255, 1)';
                console.log("Darkmode On");
                this._isDarkMode = true;

            } else {
                // Theme set to light.
                DATAChart._gridColor = 'rgba(255, 148, 148, 1)';
                DATAChart._titleColor = 'rgba(0, 0, 0, 1)';
                DATAChart._labelColor = 'rgba(0, 0, 0, 1)';
                DATAChart._tickColor = 'rgba(0, 0, 0, 1)';
                console.log("LightMode On");
                this._isDarkMode = false;
            }
        }
        setTheme(darkThemeMq);
        darkThemeMq.addEventListener('change', setTheme);
    }


    private render(el: HTMLElement) {

        let headContainer = document.createElement("div");
        el.appendChild(headContainer);
        headContainer.appendChild(DATAChart._canvas);

        // Constants ( for the chart )
        const options = {
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    color: DATAChart.TitleColor,
                    text: 'Monthly Expenses'
                },
                legend: {
                    labels: {
                        color: DATAChart.LabelColor
                    }
                }

            },
            scales: {
                x: {
                    ticks: { color: DATAChart.TickColor },
                    grid: { color: '#444' }
                },
                y: {
                    ticks: { color: DATAChart.TickColor },
                    grid: { color: '#444' }
                }
            }
        }
        const chartData = {
            datasets: [

                // Load the the Expense Data (since Monthly Expenses is loaded by default)
                {
                    label: Strings.ChartLabels[0],
                    data: ChartData.ExpenseItems,
                    borderColor: DATAChart.GridColor,
                    backgroundColor: DATAChart.GridColor,
                    fill: true,
                    parsing: {
                        yAxisKey: 'amount',
                        xAxisKey: 'month'
                    }
                }
            ]
        }

        // Create the chart
        if (ChartData.ExpenseItems.length > 0) {

            this._datachart = new Chart(DATAChart.CTX, {
                type: 'line',
                data: chartData,
                options: options
            });

        }


    }

}
// Add Data Function
function loadNetData(chart, NetData) {


    chart.options.plugins.title.text = 'NET';
    chart.data.datasets.pop(NetData);
    chart.data.datasets.push({
        label: Strings.ChartLabels[1],
        data: NetData,
        borderColor: DATAChart.GridColor,
        backgroundColor: DATAChart.GridColor,
        fill: true,
        parsing: {
            yAxisKey: 'amount',
            xAxisKey: 'month'
        }
    });
    chart.update();
}
function loadExpCATData(chart, CatData) {


    chart.options.plugins.title.text = 'Expense Catalog';
    chart.data.datasets.pop(CatData);
    chart.data.datasets.push({
        type: 'bar',
        label: Strings.ChartLabels[2],
        data: CatData,
        borderColor: DATAChart.GridColor,
        backgroundColor: DATAChart.GridColor,
        fill: true,
        parsing: {
            yAxisKey: 'amount',
            xAxisKey: 'category'
        }
    });
    chart.update();
}
function loadMonthlyExp(chart, ExpData) {

    chart.options.plugins.title.text = 'Monthly Expenses';
    chart.data.datasets.pop(ExpData);
    chart.data.datasets.push({
        label: Strings.ChartLabels[0],
        data: ExpData,
        borderColor: DATAChart.GridColor,
        backgroundColor: DATAChart.GridColor,
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
}