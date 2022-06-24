import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, Footer } from "dattatable";
import { Components } from "gd-sprest-bs";
import * as jQuery from "jquery";
import * as moment from "moment";
import { DataSource, TransItem, ExpenseItem, IncomeItem } from "./ds";
import Strings from "./strings";
import { plusSquareFill } from "gd-sprest-bs/build/icons/svgs/plusSquareFill";
import { TableTab } from "./Tabs/Table";
import { gearWideConnected } from "gd-sprest-bs/build/icons/svgs/gearWideConnected";
//import { ChartsComponent } from "./Components/Charts/monthlyExpense";
import { SubNavigation } from "./Components/subNav";
import { Tabs } from "./Components/Tabs";
import { Alert } from "gd-sprest-bs/src/components/components";
import { CustomChart } from "./Components/CusomizationModal";

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
                    text: "Options",
                    iconSize: 18,
                    iconType: gearWideConnected,
                    isButton: true,
                    className: "btn-outline-light",
                    items: [
                        {
                            text: "Customization",
                            onClick: (el: HTMLElement) => {
                                new CustomChart(el);
                            }
                        }
                    ]
                },
                {
                    onRender: (el) => {
                        let elSwitch = document.createElement('div');
                        el.appendChild(elSwitch);
                        Components.CheckboxGroup({
                            el: elSwitch,
                            onRender: (props) => {
                                props.id = "themeswitch";
                            },
                            multi: false,
                            type: Components.CheckboxGroupTypes.Switch,
                            items: [
                                {
                                    label: "Theme",
                                    onChange: (item) => {
                                        item ? alert("I Love You Senisa") : alert("Light Mode");
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


