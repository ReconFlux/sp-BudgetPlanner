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

    // Arrays
    static _ExpenseSum: Array<any> = null;
    static _NETDiff: Array<any> = null;
    static _IncomeSum: Array<any> = null;
    static _CatelogArray: Array<any> = null;

    // Numbers for the INCOME sums
    static _JanIncomeSum: number = 0;
    static _FebIncomeSum: number = 0;
    static _MarIncomeSum: number = 0;
    static _AprIncomeSum: number = 0;
    static _MayIncomeSum: number = 0;
    static _JuneIncomeSum: number = 0;
    static _JulyIncomeSum: number = 0;
    static _AugIncomeSum: number = 0;
    static _SeptIncomeSum: number = 0;
    static _OctIncomeSum: number = 0;
    static _NovIncomeSum: number = 0;
    static _DecIncomeSum: number = 0;

    // Numbers of the EXPENSE sums
    static _JanEXPSum: number = 0;
    static _FebEXPSum: number = 0;
    static _MarEXPSum: number = 0;
    static _AprEXPSum: number = 0;
    static _MayEXPSum: number = 0;
    static _JuneEXPSum: number = 0;
    static _JulyEXPSum: number = 0;
    static _AugEXPSum: number = 0;
    static _SeptEXPSum: number = 0;
    static _OctEXPSum: number = 0;
    static _NovEXPSum: number = 0;
    static _DecEXPSum: number = 0;

    // Numbers for the NET sums
    static _JanNETDiff: number = 0;
    static _FebNETDiff: number = 0;
    static _MarNETDiff: number = 0;
    static _AprNETDiff: number = 0;
    static _MayNETDiff: number = 0;
    static _JuneNETDiff: number = 0;
    static _JulyNETDiff: number = 0;
    static _AugNETDiff: number = 0;
    static _SeptNETDiff: number = 0;
    static _OctNETDiff: number = 0;
    static _NovNETDiff: number = 0;
    static _DecNETDiff: number = 0;

    // Months
    static Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    // Loads the Expenses for each month
    static loadExpenseData(): any {
        this._ExpenseSum = [];
        if (DataSource.ExpenseItems) {

            for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
                let item = DataSource.ExpenseItems[i];
                let itemDate = getFieldValue("date", item);
                let itemCategory = getFieldValue("category", item);
                let itemAmount = getFieldValue("amount", item);
                let wholeMOnth = formatDateValue(itemDate);

                // Sums for each month
                switch (wholeMOnth) {
                    case this.Months[0]: {
                        this._JanEXPSum = this._JanEXPSum += itemAmount;
                        break;
                    }
                    case this.Months[1]: {
                        this._FebEXPSum = this._FebEXPSum += itemAmount;
                        break;
                    }
                    case this.Months[2]: {
                        this._MarEXPSum = this._MarEXPSum += itemAmount;
                        break;
                    }
                    case this.Months[3]: {
                        this._AprEXPSum = this._AprEXPSum += itemAmount;
                        break;
                    }
                    case this.Months[4]: {
                        this._MayEXPSum = this._MayEXPSum += itemAmount;
                        break;
                    }
                    case this.Months[5]: {
                        this._JuneEXPSum = this._JuneEXPSum += itemAmount;
                        break;
                    }
                    case this.Months[6]: {
                        this._JulyEXPSum = this._JulyEXPSum += itemAmount;
                        break;
                    }
                    case this.Months[7]: {
                        this._AugEXPSum = this._AugEXPSum += itemAmount;
                        break;
                    }
                    case this.Months[8]: {
                        this._SeptEXPSum = this._SeptEXPSum += itemAmount;
                        break;
                    }
                    case this.Months[9]: {
                        this._OctEXPSum = this._OctEXPSum += itemAmount;
                        break;
                    }
                    case this.Months[10]: {
                        this._NovEXPSum = this._NovEXPSum += itemAmount;
                        break;
                    }
                    case this.Months[11]: {
                        this._DecEXPSum = this._DecEXPSum += itemAmount;
                        break;
                    }
                }

            }
            // Push sums into an array
            // Jans
            this._ExpenseSum.push({
                amount: this._JanEXPSum,
                month: this.Months[0]
            });
            // Febs
            this._ExpenseSum.push({
                amount: this._FebEXPSum,
                month: this.Months[1]
            });
            // Mars
            this._ExpenseSum.push({
                amount: this._MarEXPSum,
                month: this.Months[2]
            });
            // Aprs
            this._ExpenseSum.push({
                amount: this._AprEXPSum,
                month: this.Months[3]
            });
            // Mays
            this._ExpenseSum.push({
                amount: this._MayEXPSum,
                month: this.Months[4]
            });
            // Junes
            this._ExpenseSum.push({
                amount: this._JuneEXPSum,
                month: this.Months[5]
            });
            // Julys
            this._ExpenseSum.push({
                amount: this._JulyEXPSum,
                month: this.Months[6]
            });
            // Augs
            this._ExpenseSum.push({
                amount: this._AugEXPSum,
                month: this.Months[7]
            });
            // Septs
            this._ExpenseSum.push({
                amount: this._SeptEXPSum,
                month: this.Months[8]
            });
            // Octs
            this._ExpenseSum.push({
                amount: this._OctEXPSum,
                month: this.Months[9]
            });
            // Novs
            this._ExpenseSum.push({
                amount: this._NovEXPSum,
                month: this.Months[10]
            });
            // Decs
            this._ExpenseSum.push({
                amount: this._DecEXPSum,
                month: this.Months[11]
            });
            console.log("Loading Expense Array: ");
            console.log(this._ExpenseSum);
        }
    }
    // Loads the Income for each month
    static loadIncomeData(): any {
        this._IncomeSum = [];
        if (DataSource.IncomeItems) {

            for (let i = 0; i < DataSource.IncomeItems.length; i++) {
                let item = DataSource.IncomeItems[i];
                let itemDate = getFieldValue("date", item);
                let itemCategory = getFieldValue("category", item);
                let itemAmount = getFieldValue("amount", item);
                let wholeMOnth = formatDateValue(itemDate);

                // Sums for each month
                switch (wholeMOnth) {
                    case this.Months[0]: {
                        this._JanIncomeSum = this._JanIncomeSum += itemAmount;
                        break;
                    }
                    case this.Months[1]: {
                        this._FebIncomeSum = this._FebIncomeSum += itemAmount;
                        break;
                    }
                    case this.Months[2]: {
                        this._MarIncomeSum = this._MarIncomeSum += itemAmount;
                        break;
                    }
                    case this.Months[3]: {
                        this._AprIncomeSum = this._AprIncomeSum += itemAmount;
                        break;
                    }
                    case this.Months[4]: {
                        this._MayIncomeSum = this._MayIncomeSum += itemAmount;
                        break;
                    }
                    case this.Months[5]: {
                        this._JuneIncomeSum = this._JuneIncomeSum += itemAmount;
                        break;
                    }
                    case this.Months[6]: {
                        this._JulyIncomeSum = this._JulyIncomeSum += itemAmount;
                        break;
                    }
                    case this.Months[7]: {
                        this._AugIncomeSum = this._AugIncomeSum += itemAmount;
                        break;
                    }
                    case this.Months[8]: {
                        this._SeptIncomeSum = this._SeptIncomeSum += itemAmount;
                        break;
                    }
                    case this.Months[9]: {
                        this._OctIncomeSum = this._OctIncomeSum += itemAmount;
                        break;
                    }
                    case this.Months[10]: {
                        this._NovIncomeSum = this._NovIncomeSum += itemAmount;
                        break;
                    }
                    case this.Months[11]: {
                        this._DecIncomeSum = this._DecIncomeSum += itemAmount;
                        break;
                    }
                }

            }
            // Push sums into an array
            // Jans
            this._IncomeSum.push({
                amount: this._JanIncomeSum,
                month: this.Months[0]
            });
            // Febs
            this._IncomeSum.push({
                amount: this._FebIncomeSum,
                month: this.Months[1]
            });
            // Mars
            this._IncomeSum.push({
                amount: this._MarIncomeSum,
                month: this.Months[2]
            });
            // Aprs
            this._IncomeSum.push({
                amount: this._AprIncomeSum,
                month: this.Months[3]
            });
            // Mays
            this._IncomeSum.push({
                amount: this._MayIncomeSum,
                month: this.Months[4]
            });
            // Junes
            this._IncomeSum.push({
                amount: this._JuneIncomeSum,
                month: this.Months[5]
            });
            // Julys
            this._IncomeSum.push({
                amount: this._JulyIncomeSum,
                month: this.Months[6]
            });
            // Augs
            this._IncomeSum.push({
                amount: this._AugIncomeSum,
                month: this.Months[7]
            });
            // Septs
            this._IncomeSum.push({
                amount: this._SeptIncomeSum,
                month: this.Months[8]
            });
            // Octs
            this._IncomeSum.push({
                amount: this._OctIncomeSum,
                month: this.Months[9]
            });
            // Novs
            this._IncomeSum.push({
                amount: this._NovIncomeSum,
                month: this.Months[10]
            });
            // Decs
            this._IncomeSum.push({
                amount: this._DecIncomeSum,
                month: this.Months[11]
            });
            console.log("Loading Income Array: ");
            console.log(this._IncomeSum);
        }
    }
    static loadNETData(): any {
        this._NETDiff = [];
        if (DataSource.TransItems) {

            this._JanNETDiff = this._JanIncomeSum - this._JanEXPSum
            this._FebNETDiff = this._FebIncomeSum - this._FebEXPSum
            this._MarNETDiff = this._MarIncomeSum - this._MarEXPSum
            this._AprNETDiff = this._AprIncomeSum - this._AprEXPSum
            this._MayNETDiff = this._MayIncomeSum - this._MayEXPSum
            this._JuneNETDiff = this._JuneIncomeSum - this._JuneEXPSum
            this._JulyNETDiff = this._JulyIncomeSum - this._JulyEXPSum
            this._AugNETDiff = this._AugIncomeSum - this._AugEXPSum
            this._SeptNETDiff = this._SeptIncomeSum - this._SeptEXPSum
            this._OctNETDiff = this._OctIncomeSum - this._OctEXPSum
            this._NovNETDiff = this._NovIncomeSum - this._NovEXPSum
            this._DecNETDiff = this._DecIncomeSum - this._DecEXPSum

            this._NETDiff.push({
                amount: this._JanNETDiff,
                month: this.Months[0]
            });
            this._NETDiff.push({
                amount: this._FebNETDiff,
                month: this.Months[1]
            });
            this._NETDiff.push({
                amount: this._MarNETDiff,
                month: this.Months[2]
            });
            this._NETDiff.push({
                amount: this._AprNETDiff,
                month: this.Months[3]
            });
            this._NETDiff.push({
                amount: this._MayNETDiff,
                month: this.Months[4]
            });
            this._NETDiff.push({
                amount: this._JuneNETDiff,
                month: this.Months[5]
            });
            this._NETDiff.push({
                amount: this._JulyNETDiff,
                month: this.Months[6]
            });
            this._NETDiff.push({
                amount: this._AugNETDiff,
                month: this.Months[7]
            });
            this._NETDiff.push({
                amount: this._SeptNETDiff,
                month: this.Months[8]
            });
            this._NETDiff.push({
                amount: this._OctNETDiff,
                month: this.Months[9]
            });
            this._NETDiff.push({
                amount: this._NovNETDiff,
                month: this.Months[10]
            });
            this._NETDiff.push({
                amount: this._DecNETDiff,
                month: this.Months[11]
            });
        }
        console.log("Net Differences Loaded: ");
        console.log(this._NETDiff);
    }
    static loadExpenseCatelog(): any {
        this._CatelogArray = [];
        for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
            let items = DataSource.ExpenseItems[i];
            this._CatelogArray.push({
                amount: items.amount,
                category: items.category
            });
        }
        console.log(this._CatelogArray);
    }



}
