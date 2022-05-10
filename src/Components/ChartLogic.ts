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
    static _JanSum: number = 0;
    static _FebSum: number = 0;
    static _MarSum: number = 0;
    static _AprSum: number = 0;
    static _MaySum: number = 0;

    static loadJanuaryData(): any {
        this._JanuaryExpenses = [];
        this._ExpenseSum = [];
        let JanIncome = [];
        this._NETSum = [];
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

            let JanExpItems = this._JanuaryExpenses;
            JanExpItems.forEach((item) => this._JanSum += item.amount);
            // Push to the ExpenseSum Array
            this._ExpenseSum.push({
                sum: this._JanSum,
                month: "January"
            });

        };
        // Jan's Income
        if (DataSource.IncomeItems) {
            for (let i = 0; i < DataSource.IncomeItems.length; i++) {
                let item = DataSource.IncomeItems[i];

                let itemDate = getFieldValue("date", item);
                let itemCategory = getFieldValue("category", item);
                let itemAmount = getFieldValue("amount", item);
                let wholeMOnth = formatDateValue(itemDate);
                // get total expense for jan
                if (wholeMOnth == "January") {

                    JanIncome.push({
                        amount: item.amount,
                        month: wholeMOnth
                    });
                }
            }

            // Get the Sum of Income
            let _janIncomeSum: number = 0;
            let JanNet: number = 0;
            JanIncome.forEach((item) => _janIncomeSum += item.amount);

            JanNet = _janIncomeSum - this._JanSum;


            // Add Jans Net to the Net Array
            this._NETSum.push({
                amount: JanNet,
                month: "January"
            });
        };
    }
    static loadFebruaryData(): any {
        this._FebruaryExpenses = [];
        let febIncome = [];
        if (DataSource.ExpenseItems) {
            for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
                let item = DataSource.ExpenseItems[i];

                let itemDate = getFieldValue("date", item);
                let itemCategory = getFieldValue("category", item);
                let itemAmount = getFieldValue("amount", item);
                let wholeMOnth = formatDateValue(itemDate);
                // get total expense for feb
                if (wholeMOnth == "February") {

                    this._FebruaryExpenses.push({
                        amount: item.amount,
                        month: wholeMOnth
                    });
                }
            }
            // Get the Sum for the month of Feb
            let _FebSum: number = 0;
            let FebExpItems = this._FebruaryExpenses;
            FebExpItems.forEach((item) => _FebSum += item.amount);
            // Push to the ExpenseSum Array
            this._ExpenseSum.push({
                sum: _FebSum,
                month: "February"
            });
        }
        // Febs Income
        if (DataSource.IncomeItems) {
            for (let i = 0; i < DataSource.IncomeItems.length; i++) {
                let item = DataSource.IncomeItems[i];

                let itemDate = getFieldValue("date", item);
                let itemCategory = getFieldValue("category", item);
                let itemAmount = getFieldValue("amount", item);
                let wholeMOnth = formatDateValue(itemDate);
                // get total income for Feb
                if (wholeMOnth == "February") {

                    febIncome.push({
                        amount: item.amount,
                        month: wholeMOnth
                    });
                }
            }

            // Get the Sum of Income
            let _febIncomeSum: number = 0;
            let febNet: number = 0;
            febIncome.forEach((item) => _febIncomeSum += item.amount);

            febNet = _febIncomeSum - this._FebSum;


            // Add Febs Net to the Net Array
            this._NETSum.push({
                amount: febNet,
                month: "February"
            });
        };
    }
    static loadMarchData(): any {
        this._MarchExpenses = [];
        let marIncome = [];
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
        // Marchs Income
        if (DataSource.IncomeItems) {
            for (let i = 0; i < DataSource.IncomeItems.length; i++) {
                let item = DataSource.IncomeItems[i];

                let itemDate = getFieldValue("date", item);
                let itemCategory = getFieldValue("category", item);
                let itemAmount = getFieldValue("amount", item);
                let wholeMOnth = formatDateValue(itemDate);
                // get total expense for jan
                if (wholeMOnth == "March") {

                    marIncome.push({
                        amount: item.amount,
                        month: wholeMOnth
                    });
                }
            }

            // Get the Sum of Income
            let _marIncomeSum: number = 0;
            let marNet: number = 0;
            marIncome.forEach((item) => _marIncomeSum += item.amount);

            marNet = _marIncomeSum - this._MarSum;


            // Add Marchs Net to the Net Array
            this._NETSum.push({
                amount: marNet,
                month: "March"
            });
        };
    }
    static loadAprilData(): any {
        this._AprilExpenses = [];
        let aprIncome = [];
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
        let mayIncome = [];
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
