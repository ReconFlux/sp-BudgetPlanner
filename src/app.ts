import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, Footer } from "dattatable";
import { Components } from "gd-sprest-bs";
import * as jQuery from "jquery";
import * as moment from "moment";
import { DataSource, TransItem, ExpenseItem, IncomeItem } from "./ds";
import Strings from "./strings";
import { plusSquareFill } from "gd-sprest-bs/build/icons/svgs/plusSquareFill";
import { TableTab } from "./Tabs/Table";
import { ChartsComponent } from "./Tabs/Charts";

/**
 * Main Application
 */
export class App {
    // Vars
    private _navigation: Navigation = null;
    private _Tabs: Components.INav = null;
    private _footer: Footer = null;
    private _Chart: ChartsComponent = null;

    // Constructor
    constructor(el: HTMLElement) {
        // Set the list name
        ItemForm.ListName = Strings.Lists.Main;

        // Render the dashboard
        this.render(el);
    }

    // Renders the dashboard
    private render(el: HTMLElement) {
        // Add the navigation
        this._navigation = new Navigation({
            el,
            title: Strings.ProjectName,
            hideFilter: true, // for now its hidden
            hideSearch: true,
            onRendering: props => {
                props.type = Components.NavbarTypes.Dark
            },
            itemsEnd: [
                {
                    text: " ",
                    iconType: plusSquareFill,
                    iconSize: 19,
                    isButton: true,
                    className: "btn-outline-light me-1 btn-sm",
                    onClick: () => {
                        // Create an item
                        ItemForm.create({
                            // Remove the Title field ( function at bottom of page )
                            onCreateEditForm: props => { return this, updateFormProperties(props); },
                            useModal: true,
                            onUpdate: () => {
                                // Load the data
                                DataSource.loadTransItems().then(items => {
                                    // Refresh the table
                                    // dashboard.refresh(items);
                                    // TODO, Need to figure out how to refresh the tables and charts
                                });
                            }
                        });
                    }
                }
            ]
        });
        this._Tabs = Components.Nav({
            el: el,
            isPills: false,
            onLinkRendered: (el) => {
                el.classList.add("fs-5");
            },
            id: "Tabs",
            isTabs: true,
            items: [
                {
                    title: "Data Sheet",
                    isActive: true,
                    onRenderTab: (_tab) => { new TableTab(_tab); }
                },
                {
                    title: "Charts",
                    onRenderTab: (el) => { new ChartsComponent(el); }
                }
            ]
        });
        this._footer = new Footer({
            el,
            itemsEnd: [
                {
                    text: "v" + Strings.Version
                }
            ]
        });

    }

}
function updateFormProperties(props: Components.IListFormEditProps): Components.IListFormEditProps {
    props.excludeFields = ["Title"];
    return props;
}

