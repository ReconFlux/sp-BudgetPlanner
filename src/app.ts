import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, Footer } from "dattatable";
import { Components } from "gd-sprest-bs";
import * as jQuery from "jquery";
import * as moment from "moment";
import { DataSource, TransItem, ExpenseItem, IncomeItem } from "./ds";
import Strings from "./strings";
import { plusSquareFill } from "gd-sprest-bs/build/icons/svgs/plusSquareFill";
import { TableTab } from "./Tabs/Table";
//import { ChartsComponent } from "./Components/Charts/monthlyExpense";
import { SubNavigation } from "./Components/subNav";
import { Tabs } from "./Components/Tabs";
import { Alert } from "gd-sprest-bs/src/components/components";

/**
 * Main Application
 */
export class App {
    // Vars
    private _navigation: Navigation = null;
    private _SubNavigation: SubNavigation = null;
    private _footer: Footer = null;
    private _el: HTMLElement;
    private _Tabs: Components.INav = null;


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

        // Element Properties
        el.id = "BudgetPlanner_App";

        // Add the navigation
        this._navigation = new Navigation({
            el,
            title: Strings.ProjectName,
            hideFilter: true, // for now its hidden
            hideSearch: true,
            onRendering: props => {
                props.type = Components.NavbarTypes.Dark;
                props.id = "app_mainNav";
            },
            itemsEnd: [
                {
                    onRender: (el) => {
                        Components.CheckboxGroup({
                            el: el,
                            isInline: true,
                            items: [
                                {
                                    type: Components.CheckboxGroupTypes.Switch,
                                    label: "Theme",
                                    isSelected: true,
                                    onChange: () => {
                                        alert("Change Theme");
                                    }
                                }
                            ]
                        })
                    }
                }
            ]
        });


        // Add the SubNav
        new SubNavigation({
            el: el,
            onRefresh: () => {
                appTabs.Refresh();
            }
        });

        // Tabs
        let appTabs = new Tabs(this._el);

        // this._footer = new Footer({
        //     el,
        //     onRendering: (props) => {
        //         props.id = "versionfooter";
        //     },
        //     itemsEnd: [
        //         {
        //             text: "v" + Strings.Version
        //         }
        //     ]
        // });

    }
}


