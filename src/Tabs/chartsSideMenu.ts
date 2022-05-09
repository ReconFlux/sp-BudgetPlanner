import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, Footer } from "dattatable";
import { Components } from "gd-sprest-bs";
import * as jQuery from "jquery";
import * as moment from "moment";
import { DataSource, TransItem, ExpenseItem, IncomeItem } from "../ds";
import Strings from "../strings";
import { plusSquareFill } from "gd-sprest-bs/build/icons/svgs/plusSquareFill";
import { TableTab } from "../Tabs/Table";
import { SubNavigation } from "../Components/subNav";
import { DATAChart } from "../Components/Charts/monthlyExpense";


// Properties
interface IProps {
    el: HTMLElement;
    onRefresh: () => void;
}

export class ChartSideMenu {

    static TabNames = {
        monthlyExpense: "Monthly Expenses",
        monthlyIncome: "Monthly Income"
    }



    // Vars
    private _el: HTMLElement = null;
    private _Tabs: Components.INav = null;
    private _DATAChart: DATAChart = null;
    private _chart = document.createElement("div");
    private _active: string = "active";
    private _props: IProps = null;



    // Constructor
    constructor(props: IProps) {


        this._el = props.el;
        this._props = props;
        // Render the dashboard
        this.render();

    }



    // Renders the dashboard
    private render() {
        let _mainContainer = document.createElement("div");
        let _row = document.createElement("div");
        let _leftside = document.createElement("div");
        let _rightside = document.createElement("div");

        this._el.appendChild(_mainContainer);

        // container props
        _mainContainer.classList.add("container");
        _mainContainer.id = "SideMenu_MainContainer";
        _mainContainer.appendChild(_row);

        // row props
        _row.classList.add("row");
        _row.appendChild(_leftside);
        _row.appendChild(_rightside);

        // Column props
        _leftside.classList.add("col-2");
        _rightside.classList.add("col-10");

        // Left Side Menu
        let _btn_monthExpense = document.createElement("div");
        let _btn_Net = document.createElement("div");
        let _btn_catExp = document.createElement("div");
        _leftside.appendChild(_btn_monthExpense);
        _leftside.appendChild(_btn_Net);
        _leftside.appendChild(_btn_catExp);

        // Render the buttons
        Components.Button({
            el: _btn_monthExpense,
            text: "Monthly Expenses",
            id: "btn_Expenses",
            className: "m-1 active btn-chart",
            type: Components.ButtonTypes.OutlineDark,
            onClick: (props, ev) => {
                this.setActiveElement((ev.currentTarget as HTMLElement).querySelector(".btn-chart"));
                let self = document.getElementById('btn_Expenses') as HTMLElement;
                self.classList.add(this._active);
                this.switchtoMonthlyExp();
            }

        });
        Components.Button({
            el: _btn_Net,
            text: "Monthly NET",
            className: "m-1 btn-chart",
            id: "btn_NET",
            type: Components.ButtonTypes.OutlineDark,
            onClick: (props, ev) => {
                this.setActiveElement((ev.currentTarget as HTMLElement).querySelector(".btn-chart"));
                let self = document.getElementById('btn_NET') as HTMLElement;
                self.classList.add(this._active);
                this.SwitchtoNet();
            }
        });
        Components.Button({
            el: _btn_catExp,
            text: "Expense Catalog",
            className: "m-1 btn-chart",
            id: "btn_catExp",
            type: Components.ButtonTypes.OutlineDark,
            onClick: (props, ev) => {
                this.setActiveElement((ev.currentTarget as HTMLElement).querySelector(".btn-chart"));
                let self = document.getElementById('btn_catExp') as HTMLElement;
                self.classList.add(this._active);
                this.SwitchtoCATExp();
            }
        });



        _rightside.appendChild(this._chart);
        this._DATAChart = new DATAChart(this._chart);
    }

    private setActiveElement(el: HTMLElement) {
        // Get the buttons
        let elements = document.querySelectorAll(".btn-chart");
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];

            // Revert the item
            element.classList.remove("active");
        }
    }

    Refresh() {
        // Calls the refresh functions
        console.log("CHART REFRESH");
        this._DATAChart.refresh();
    }

    SwitchtoNet() {
        this._DATAChart.switchtoNET();
    }

    SwitchtoCATExp() {
        this._DATAChart.switchtoCATExp();
    }

    switchtoMonthlyExp() {
        this._DATAChart.switchtoMonthlyExp();
    }
}