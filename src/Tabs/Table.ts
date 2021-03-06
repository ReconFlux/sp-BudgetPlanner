import Strings from "../strings";
import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, DataTable, LoadingDialog } from "dattatable";
import { Components } from "gd-sprest-bs";
import * as jQuery from "jquery";
import * as moment from "moment";
import { DataSource, TransItem } from "../ds";


export class TableTab {
    // Vars
    private _Header: Navigation = null;
    private _el: HTMLElement = null;
    // Constructor
    constructor(el: HTMLElement) {
        // Save the properties
        this._el = el;
        this.render();
    }

    refresh() {
        console.log("Refreshes Datasheet");
        // Show a loading dialog
        LoadingDialog.setHeader("Reloading Data");
        LoadingDialog.setBody("Reloading the datasheet. This will close afterwards.");
        LoadingDialog.show();

        // Clear the element
        while (this._el.firstChild) { this._el.removeChild(this._el.firstChild); }

        // Load the workspace item
        DataSource.init().then(() => {
            // Render the component
            this.render();

            // Hide the dialog
            LoadingDialog.hide();
        });
    }

    // Create the Table
    private renderDatasheet(el) {
        let headContainer = document.createElement("div");
        let Table = new DataTable({
            el,
            onRendered: (props) => {
                props.id = "DataSheet_Table";
            },
            rows: DataSource.TransItems,
            dtProps: {
                dom: 'rt<"row"<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>',
                columnDefs: [
                    {
                        "targets": 0,
                        "orderable": false,
                        "searchable": false
                    }
                ],
                createdRow: function (row, data, index) {
                    jQuery('td', row).addClass('align-middle');
                },
                drawCallback: function (settings) {
                    let api = new jQuery.fn.dataTable.Api(settings) as any;
                    jQuery(api.context[0].nTable).removeClass('no-footer');
                    jQuery(api.context[0].nTable).addClass('tbl-footer');
                    jQuery(api.context[0].nTable).addClass('table-striped');
                    jQuery(api.context[0].nTableWrapper).find('.dataTables_info').addClass('text-center');
                    jQuery(api.context[0].nTableWrapper).find('.dataTables_length').addClass('pt-2');
                    jQuery(api.context[0].nTableWrapper).find('.dataTables_paginate').addClass('pt-03');
                },
                headerCallback: function (thead, data, start, end, display) {
                    jQuery('th', thead).addClass('align-middle');
                },
                // Order by the 1st column by default; ascending
                order: [[1, "asc"]]
            },
            columns: [
                {
                    name: "category",
                    title: "Category"
                },
                {
                    name: "amount",
                    title: "Amount"
                },
                {
                    name: "date",
                    title: "Date",
                    // Format the date
                    onRenderCell: (el, column, item: TransItem) => {
                        let date = item[column.name];
                        el.innerHTML = moment(date).format(Strings.DateFormat);
                    }
                }
            ]
        });
        // this._Header = new Navigation({
        //     el: headContainer,
        //     title: "Transactions Table",
        //     hideFilter: true,
        //     hideSearch: true,
        //     onRendering: props => {
        //         props.type = Components.NavbarTypes.Light;
        //         props.id = "Table_Header";
        //     }
        // });
        // el.prepend(headContainer);
    }

    // Render
    private render() {
        // render the table
        this.renderDatasheet(this._el)
    }
}