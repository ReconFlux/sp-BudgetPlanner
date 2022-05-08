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
        // Set the list name
        ItemForm.ListName = Strings.Lists.Main;

        this._el = el;

        // Render the dashboard
        this.render(el);
    }



    // Renders the dashboard
    private render(el: HTMLElement) {
        let mainContainer = document.createElement("div");


        // Side Bar
        this._Tabs = Components.Nav({
            el: mainContainer,
            // onLinkRendered: (el) => {
            //     el.classList.add("fs-5");
            // },
            id: "SideMenuTabs",
            isVertical: true,
            isPills: true,
            isTabs: true,
            items: [
                {
                    title: ChartSideMenu.TabNames.monthlyExpense,
                    isActive: true,
                    onRenderTab: (ChartLoader) => { this._monthlyexpense = new MonthlyExpenseChart(ChartLoader); }
                },
                {
                    title: ChartSideMenu.TabNames.monthlyIncome,
                    //onRenderTab: (el) => { this._Charts = new ChartsComponent(el); }
                }
            ]
        });
        // Update the classes on tabs
        this._Tabs.el.classList.remove("nav-tabs");
    }
    // Refresh() {
    //     // Calls the refresh functions
    //     this._Charts.refresh();
    //     this._DataSheet.refresh();
    // }
}