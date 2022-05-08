import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, Footer } from "dattatable";
import { Components } from "gd-sprest-bs";
import * as jQuery from "jquery";
import * as moment from "moment";
import { DataSource, TransItem, ExpenseItem, IncomeItem } from "../ds";
import Strings from "../strings";
import { plusSquareFill } from "gd-sprest-bs/build/icons/svgs/plusSquareFill";
import { TableTab } from "../Tabs/Table";
import { SubNavigation } from "../Components/subNav";
import { MonthlyExpenseChart } from "../Components/Charts/monthlyExpense";

/**
 * Main Application
 */
export class ChartSideMenu {

    static TabNames = {
        monthlyExpense: "Monthly Expenses",
        monthlyIncome: "Monthly Income"
    }



    // Vars
    private _el: HTMLElement;
    private _Tabs: Components.INav = null;
    private _monthlyexpense: MonthlyExpenseChart = null;




    // Constructor
    constructor(el: HTMLElement) {

        this._el = el;

        // Render the dashboard
        this.render(el);
    }



    // Renders the dashboard
    private render(el: HTMLElement) {
        let _mainContainer = document.createElement("div");
        let _row = document.createElement("div");
        let _leftside = document.createElement("div");
        let _rightside = document.createElement("div");
        let _chart = document.createElement("div");

        el.appendChild(_mainContainer);

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
        _leftside.style.backgroundColor = "grey";
        _rightside.classList.add("col-9");

        // Left Side Menu
        let _button1EL = document.createElement("div");
        let _buttonEl2 = document.createElement("div");
        _leftside.appendChild(_buttonEl2);
        _leftside.appendChild(_button1EL);
        // Render the buttons
        Components.Button({
            el: _button1EL,
            text: "Monthly Expense",
            id: "monthExpenenseButton",
            type: Components.ButtonTypes.OutlineDark,
        });
        Components.Button({
            el: _buttonEl2,
            text: "Monthly NET",
            id: "monthExpenenseButton",
            type: Components.ButtonTypes.OutlineDark,
        });



        _rightside.appendChild(_chart);
        let Chart = new MonthlyExpenseChart(_chart);
    }
    // Refresh() {
    //     // Calls the refresh functions
    //     this._Charts.refresh();
    //     this._DataSheet.refresh();
    // }
}