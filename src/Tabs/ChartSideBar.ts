import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, Footer } from "dattatable";
import { Components } from "gd-sprest-bs";
import * as jQuery from "jquery";
import * as moment from "moment";
import { DataSource, TransItem, ExpenseItem, IncomeItem } from "../ds";
import Strings from "../strings";
import { plusSquareFill } from "gd-sprest-bs/build/icons/svgs/plusSquareFill";
import { TableTab } from "../Tabs/Table";
import { ChartsTab } from "../Tabs/Charts";

/**
 * Main Application
 */
export class ChartsSideBar {
    // Vars
    private _navigation: Navigation = null;
    private _Tabs: Components.INav = null;
    private _footer: Footer = null;

    // Constructor
    constructor(el: HTMLElement) {
        // Set the list name
        ItemForm.ListName = Strings.Lists.Main;

        // Render the dashboard
        this.render(el);
    }

    // Renders the dashboard
    private render(el: HTMLElement) {

        this._Tabs = Components.Nav({
            el: el,
            isPills: false,
            onLinkRendered: (el) => {
                el.classList.add("fs-5");
            },
            id: "Chart_Tabs",
            isTabs: true,
            isVertical: true,
            items: [
                {
                    isActive: true,
                    title: "Transaction Chart",
                    onRenderTab: (el) => { new ChartsTab(el); },

                },
                {
                    title: "Monthly Exepense Chart",
                },
            ]
        });
    }
}