import Strings from "../strings";
import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, DataTable } from "dattatable";
import { Components } from "gd-sprest-bs";
import * as jQuery from "jquery";
import * as moment from "moment";
import { DataSource, TransItem } from "../ds";


export class TableTab {
    // Vars
    // Constructor
    constructor(el: HTMLElement) {
        this.render(el);
    }
    // Render
    private render(el: HTMLElement) {
        let Table = new DataTable({
            el,
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
                        el.innerHTML = moment(date).format("MMMM DD, YYYY");
                    }
                }
            ]
        });
    }
}