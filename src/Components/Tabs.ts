import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, Footer } from "dattatable";
import { Components } from "gd-sprest-bs";
import * as jQuery from "jquery";
import * as moment from "moment";
import { DataSource, TransItem, ExpenseItem, IncomeItem } from "../ds";
import Strings from "../strings";
import { plusSquareFill } from "gd-sprest-bs/build/icons/svgs/plusSquareFill";
import { TableTab } from "../Tabs/Table";
import { SubNavigation } from "../Components/subNav";
import { ChartSideMenu } from "../Tabs/chartsSideMenu";

/**
 * Main Application
 */
export class Tabs {

    static TabNames = {
        DataSheet: "Datasheet",
        Charts: "Charts"
    }



    // Vars
    private _el: HTMLElement;
    private _Tabs: Components.INav = null;
    private _DataSheet: TableTab = null;
    private _SideMenu: ChartSideMenu = null;




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
        // element properties
        let _sidemenuElement = document.createElement("div");
        _sidemenuElement.id = "SideMenu_Element";
        this._Tabs = Components.Nav({
            el: el,
            isPills: true,
            onLinkRendered: (el) => {
                el.classList.add("fs-5");
            },
            id: "Tabs",
            isTabs: true,
            enableFill: true,
            items: [
                {
                    title: Tabs.TabNames.DataSheet,
                    isActive: true,
                    onRenderTab: (_tab) => { this._DataSheet = new TableTab(_tab); }
                },
                {
                    title: Tabs.TabNames.Charts,
                    onRenderTab: (_sidemenuElement) => {
                        this._SideMenu = new ChartSideMenu({
                            el: _sidemenuElement,
                            onRefresh: () => {
                                this._SideMenu.Refresh();
                            }
                        });
                    }
                }
            ]
        });
        // Update the classes on tabs
        this._Tabs.el.classList.remove("nav-tabs");
    }
    Refresh() {
        // Calls the refresh functions
        //this._Charts.refresh();
        this._SideMenu.Refresh();
        this._DataSheet.refresh();
    }
}