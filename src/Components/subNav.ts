import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, Footer } from "dattatable";
import { Components } from "gd-sprest-bs";
import * as jQuery from "jquery";
import * as moment from "moment";
import { DataSource, TransItem, ExpenseItem, IncomeItem } from "../ds";
import Strings from "../strings";
import { plusSquareFill } from "gd-sprest-bs/build/icons/svgs/plusSquareFill";
import { TableTab } from "../Tabs/Table";
//import { ChartsComponent } from "./Charts/monthlyExpense";


// Properties
interface IProps {
    el: HTMLElement;
    onRefresh: () => void;
}


/**
 * Sub Navigation
 */
export class SubNavigation {
    // Vars
    private _navigation: Navigation = null;
    private _Tabs: Components.INav = null;
    private _footer: Footer = null;
    private _el: HTMLElement;
    //private _GChart: ChartsComponent = null;
    private _props: IProps = null;

    // Constructor
    constructor(props: IProps) {

        this._props = props;

        // Set the list name
        ItemForm.ListName = Strings.Lists.Main;

        // Create sub nav element
        this._el = document.createElement("div");
        this._props.el.appendChild(this._el);

        // Render the dashboard
        this.render();
    }



    // Render
    private render() {
        //el props
        this._el.id = "app_SubnavEl";
        this._navigation = new Navigation({
            el: this._el,
            title: "",
            onRendered: (props) => {
                props.id = "appSubNAV";
            },
            hideFilter: true, // for now its hidden
            hideSearch: true,
            onRendering: props => {
                props.type = Components.NavbarTypes.Light;
                props.id = "App_SubnavBar";
            },
            items: [
                {
                    text: " Add a transaction",
                    onRender: (props) => {
                        props.id = "APP_AddButton";
                    },
                    iconType: plusSquareFill,
                    iconSize: 22,
                    isButton: true,
                    className: "btn-outline-light me-1 btn-sm",
                    onClick: () => {
                        // Create an item
                        ItemForm.create({
                            // Remove the Title field ( function at bottom of page )
                            onCreateEditForm: props => { return this, updateFormProperties(props); },
                            useModal: true,
                            onUpdate: () => {
                                DataSource.init().then((items) => {
                                    this._props.onRefresh();
                                });
                            }
                        });
                    }
                }
            ]
        });
    }
}
function updateFormProperties(props: Components.IListFormEditProps): Components.IListFormEditProps {
    props.excludeFields = ["Title"];
    return props;
}
