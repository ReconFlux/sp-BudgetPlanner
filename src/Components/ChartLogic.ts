import Strings from "../strings";
import { Components } from "gd-sprest-bs";
import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, DataTable } from "dattatable";
import * as jQuery from "jquery";
import * as moment from "moment";
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import { getRelativePosition } from 'chart.js/helpers';
import { ArrayListener } from 'chart.js/helpers';
import { DataSource, ExpenseItem } from "../ds";
import { formatDateValue, getFieldValue } from "../common";

export class ChartData {
    static _JanuaryExpenses: Array<any> = null;
    static _FebruaryExpenses: Array<any> = null;
    static _MarchExpenses: Array<any> = null;
    static _AprilExpenses: Array<any> = null;
    static _MayExpenses: Array<any> = null;
    static _JuneExpenses: Array<any> = null;
    static _JulyExpenses: Array<any> = null;
    static _AugustExpenses: Array<any> = null;
    static _SeptemberExpenses: Array<any> = null;
    static _OctoberExpenses: Array<any> = null;
    static _NovemberExpenses: Array<any> = null;
    static _DecemberExpenses: Array<any> = null;


    static _ExpenseSum: Array<any> = null;
    static _NETSum: Array<any> = null;

    static loadJanuaryData(): any {
        this._JanuaryExpenses = [];
        this._ExpenseSum = [];
        if (DataSource.ExpenseItems) {
            for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
                let item = DataSource.ExpenseItems[i];

                let itemDate = getFieldValue("date", item);
                let itemCategory = getFieldValue("category", item);
                let itemAmount = getFieldValue("amount", item);
                let wholeMOnth = formatDateValue(itemDate);
                // get total expense for jan
                if (wholeMOnth == "January") {

                    this._JanuaryExpenses.push({
                        amount: item.amount,
                        month: wholeMOnth
                    });
                }
            }
            // Get the Sum for the month of Jan
            let _Jansum: number = 0;
            let JanExpItems = this._JanuaryExpenses;
            JanExpItems.forEach((item) => _Jansum += item.amount);
            // Push to the ExpenseSum Array
            this._ExpenseSum.push({
                sum: _Jansum,
                month: "January"
            });
        }
    }
    static loadFebruaryData(): any {
        this._FebruaryExpenses = [];
        if (DataSource.ExpenseItems) {
            for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
                let item = DataSource.ExpenseItems[i];

                let itemDate = getFieldValue("date", item);
                let itemCategory = getFieldValue("category", item);
                let itemAmount = getFieldValue("amount", item);
                let wholeMOnth = formatDateValue(itemDate);
                // get total expense for jan
                if (wholeMOnth == "February") {

                    this._FebruaryExpenses.push({
                        amount: item.amount,
                        month: wholeMOnth
                    });
                }
            }
            // Get the Sum for the month of Jan
            let _FebSum: number = 0;
            let FebExpItems = this._FebruaryExpenses;
            FebExpItems.forEach((item) => _FebSum += item.amount);
            // Push to the ExpenseSum Array
            this._ExpenseSum.push({
                sum: _FebSum,
                month: "February"
            });
        }
    }
    static loadMarchData(): any {
        this._MarchExpenses = [];
        if (DataSource.ExpenseItems) {
            for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
                let item = DataSource.ExpenseItems[i];

                let itemDate = getFieldValue("date", item);
                let itemCategory = getFieldValue("category", item);
                let itemAmount = getFieldValue("amount", item);
                let wholeMOnth = formatDateValue(itemDate);
                // get total expense for jan
                if (wholeMOnth == "March") {

                    this._MarchExpenses.push({
                        amount: item.amount,
                        month: wholeMOnth
                    });
                }
            }
            // Get the Sum for the month of Jan
            let _MarchSum: number = 0;
            let FebExpItems = this._MarchExpenses;
            FebExpItems.forEach((item) => _MarchSum += item.amount);
            // Push to the ExpenseSum Array
            this._ExpenseSum.push({
                sum: _MarchSum,
                month: "March"
            });
        }
    }
    static loadAprilData(): any {
        this._AprilExpenses = [];
        if (DataSource.ExpenseItems) {
            for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
                let item = DataSource.ExpenseItems[i];

                let itemDate = getFieldValue("date", item);
                let itemCategory = getFieldValue("category", item);
                let itemAmount = getFieldValue("amount", item);
                let wholeMOnth = formatDateValue(itemDate);
                // get total expense for jan
                if (wholeMOnth == "April") {

                    this._AprilExpenses.push({
                        amount: item.amount,
                        month: wholeMOnth
                    });
                }
            }
            // Get the Sum for the month of Jan
            let _AprilSum: number = 0;
            let FebExpItems = this._AprilExpenses;
            FebExpItems.forEach((item) => _AprilSum += item.amount);
            // Push to the ExpenseSum Array
            this._ExpenseSum.push({
                sum: _AprilSum,
                month: "April"
            });
        }
    }
    static loadMayData(): any {
        this._MayExpenses = [];
        if (DataSource.ExpenseItems) {
            for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
                let item = DataSource.ExpenseItems[i];

                let itemDate = getFieldValue("date", item);
                let itemCategory = getFieldValue("category", item);
                let itemAmount = getFieldValue("amount", item);
                let wholeMOnth = formatDateValue(itemDate);
                // get total expense for jan
                if (wholeMOnth == "May") {

                    this._MayExpenses.push({
                        amount: item.amount,
                        month: wholeMOnth
                    });
                }
            }
            // Get the Sum for the month of Jan
            let _MaySum: number = 0;
            let FebExpItems = this._MayExpenses;
            FebExpItems.forEach((item) => _MaySum += item.amount);
            // Push to the ExpenseSum Array
            this._ExpenseSum.push({
                sum: _MaySum,
                month: "May"
            });
        }
    }




}

// private _JanuaryExpensesSum: Array<any> = null;
// private _FebruaryExpensesSum: Array<any> = null;
// private _MarchExpensesSum: Array<any> = null;
// private _AprilExpensesSum: Array<any> = null;
// private _JuneExpensesSum: Array<any> = null;
// private _JulyExpensesSum: Array<any> = null;
// private _AugustExpensesSum: Array<any> = null;
// private _SeptemberExpensesSum: Array<any> = null;
// private _OctoberExpensesSum: Array<any> = null;
// private _NovemberExpensesSum: Array<any> = null;
// private _DecemberExpensesSum: Array<any> = null;

// this._JanuaryExpensesSum = [];
// this._FebruaryExpensesSum = [];
// this._MarchExpensesSum = [];
// this._AprilExpensesSum = [];
// this._JuneExpensesSum = [];
// this._JulyExpensesSum = [];
// this._AugustExpensesSum = [];
// this._SeptemberExpensesSum = [];
// this._OctoberExpensesSum = [];
// this._NovemberExpensesSum = [];
// this._DecemberExpensesSum = [];
