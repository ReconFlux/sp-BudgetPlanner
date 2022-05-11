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
    static _NETSum: Array<any> = null;
    static _IncomeSum: Array<any> = null;

    // Numbers for the sums
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

    // Months
    static Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    // static loadJanuaryData(): any {
    //     this._JanuaryExpenses = [];
    //     this._ExpenseSum = [];
    //     // this._NETSum = [];
    //     let JanIncome = [];
    //     if (DataSource.ExpenseItems) {
    //         for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
    //             let item = DataSource.ExpenseItems[i];

    //             let itemDate = getFieldValue("date", item);
    //             let itemCategory = getFieldValue("category", item);
    //             let itemAmount = getFieldValue("amount", item);
    //             let wholeMOnth = formatDateValue(itemDate);
    //             // get total expense for jan
    //             if (wholeMOnth == "January") {

    //                 this._JanuaryExpenses.push({
    //                     amount: item.amount,
    //                     month: wholeMOnth
    //                 });
    //             }
    //         }
    //         // Get the Sum for the month of Jan

    //         let JanExpItems = this._JanuaryExpenses;
    //         JanExpItems.forEach((item) => this._JanSum += item.amount);
    //         // Push to the ExpenseSum Array
    //         this._ExpenseSum.push({
    //             sum: this._JanSum,
    //             month: "January"
    //         });

    //     };
    //     // Jan's Income
    //     if (DataSource.IncomeItems) {
    //         for (let i = 0; i < DataSource.IncomeItems.length; i++) {
    //             let item = DataSource.IncomeItems[i];

    //             let itemDate = getFieldValue("date", item);
    //             let itemCategory = getFieldValue("category", item);
    //             let itemAmount = getFieldValue("amount", item);
    //             let wholeMOnth = formatDateValue(itemDate);
    //             // get total expense for jan
    //             if (wholeMOnth == "January") {

    //                 JanIncome.push({
    //                     amount: item.amount,
    //                     month: wholeMOnth
    //                 });
    //             }
    //         }

    //         // Get the Sum of Income
    //         let _janIncomeSum: number = 0;
    //         let JanNet: number = 0;
    //         JanIncome.forEach((item) => _janIncomeSum += item.amount);

    //         JanNet = _janIncomeSum - this._JanSum;


    //         // Add Jans Net to the Net Array
    //         this._NETSum.push({
    //             amount: JanNet,
    //             month: "January"
    //         });
    //     };
    // }
    // static loadFebruaryData(): any {
    //     this._FebruaryExpenses = [];
    //     this._ExpenseSum = [];
    //     // this._NETSum = [];
    //     let febIncome = [];
    //     if (DataSource.ExpenseItems) {
    //         for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
    //             let item = DataSource.ExpenseItems[i];

    //             let itemDate = getFieldValue("date", item);
    //             let itemCategory = getFieldValue("category", item);
    //             let itemAmount = getFieldValue("amount", item);
    //             let wholeMOnth = formatDateValue(itemDate);
    //             // get total expense for feb
    //             if (wholeMOnth == "February") {

    //                 this._FebruaryExpenses.push({
    //                     amount: item.amount,
    //                     month: wholeMOnth
    //                 });
    //             }
    //         }
    //         // Get the Sum for the month of Feb

    //         let FebExpItems = this._FebruaryExpenses;
    //         FebExpItems.forEach((item) => this._FebSum += item.amount);
    //         // Push to the ExpenseSum Array
    //         this._ExpenseSum.push({
    //             sum: this._FebSum,
    //             month: "February"
    //         });
    //     }
    //     // Febs Income
    //     if (DataSource.IncomeItems) {
    //         for (let i = 0; i < DataSource.IncomeItems.length; i++) {
    //             let item = DataSource.IncomeItems[i];

    //             let itemDate = getFieldValue("date", item);
    //             let itemCategory = getFieldValue("category", item);
    //             let itemAmount = getFieldValue("amount", item);
    //             let wholeMOnth = formatDateValue(itemDate);
    //             // get total income for Feb
    //             if (wholeMOnth == "February") {

    //                 febIncome.push({
    //                     amount: item.amount,
    //                     month: wholeMOnth
    //                 });
    //             }
    //         }

    //         // Get the Sum of Income
    //         let _febIncomeSum: number = 0;
    //         let febNet: number = 0;
    //         febIncome.forEach((item) => _febIncomeSum += item.amount);

    //         febNet = _febIncomeSum - this._FebSum;


    //         // Add Febs Net to the Net Array
    //         this._NETSum.push({
    //             amount: febNet,
    //             month: "February"
    //         });
    //     };
    // }
    // static loadMarchData(): any {
    //     this._MarchExpenses = [];
    //     this._ExpenseSum = [];
    //     // this._NETSum = [];
    //     let marIncome = [];
    //     if (DataSource.ExpenseItems) {
    //         for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
    //             let item = DataSource.ExpenseItems[i];

    //             let itemDate = getFieldValue("date", item);
    //             let itemCategory = getFieldValue("category", item);
    //             let itemAmount = getFieldValue("amount", item);
    //             let wholeMOnth = formatDateValue(itemDate);
    //             // get total expense for jan
    //             if (wholeMOnth == "March") {

    //                 this._MarchExpenses.push({
    //                     amount: item.amount,
    //                     month: wholeMOnth
    //                 });
    //             }
    //         }
    //         // Get the Sum for the month of Jan
    //         let FebExpItems = this._MarchExpenses;
    //         FebExpItems.forEach((item) => this._MarSum += item.amount);
    //         // Push to the ExpenseSum Array
    //         this._ExpenseSum.push({
    //             sum: this._MarSum,
    //             month: "March"
    //         });
    //     }
    //     // Marchs Income
    //     if (DataSource.IncomeItems) {
    //         for (let i = 0; i < DataSource.IncomeItems.length; i++) {
    //             let item = DataSource.IncomeItems[i];

    //             let itemDate = getFieldValue("date", item);
    //             let itemCategory = getFieldValue("category", item);
    //             let itemAmount = getFieldValue("amount", item);
    //             let wholeMOnth = formatDateValue(itemDate);
    //             // get total expense for jan
    //             if (wholeMOnth == "March") {

    //                 marIncome.push({
    //                     amount: item.amount,
    //                     month: wholeMOnth
    //                 });
    //             }
    //         }

    //         // Get the Sum of Income
    //         let _marIncomeSum: number = 0;
    //         let marNet: number = 0;
    //         marIncome.forEach((item) => _marIncomeSum += item.amount);

    //         marNet = _marIncomeSum - this._MarSum;


    //         // Add Marchs Net to the Net Array
    //         this._NETSum.push({
    //             amount: marNet,
    //             month: "March"
    //         });
    //     };
    // }
    // static loadAprilData(): any {
    //     this._AprilExpenses = [];
    //     this._ExpenseSum = [];
    //     //   this._NETSum = [];
    //     let aprIncome = [];
    //     if (DataSource.ExpenseItems) {
    //         for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
    //             let item = DataSource.ExpenseItems[i];

    //             let itemDate = getFieldValue("date", item);
    //             let itemCategory = getFieldValue("category", item);
    //             let itemAmount = getFieldValue("amount", item);
    //             let wholeMOnth = formatDateValue(itemDate);
    //             // get total expense for jan
    //             if (wholeMOnth == "April") {

    //                 this._AprilExpenses.push({
    //                     amount: item.amount,
    //                     month: wholeMOnth
    //                 });
    //             }
    //         }
    //         // Get the Sum for the month of Jan
    //         let FebExpItems = this._AprilExpenses;
    //         FebExpItems.forEach((item) => this._AprSum += item.amount);
    //         // Push to the ExpenseSum Array
    //         this._ExpenseSum.push({
    //             sum: this._AprSum,
    //             month: "April"
    //         });
    //     }
    //     // Aprils Income
    //     if (DataSource.IncomeItems) {
    //         for (let i = 0; i < DataSource.IncomeItems.length; i++) {
    //             let item = DataSource.IncomeItems[i];

    //             let itemDate = getFieldValue("date", item);
    //             let itemCategory = getFieldValue("category", item);
    //             let itemAmount = getFieldValue("amount", item);
    //             let wholeMOnth = formatDateValue(itemDate);
    //             // get total expense for April
    //             if (wholeMOnth == "April") {

    //                 aprIncome.push({
    //                     amount: item.amount,
    //                     month: wholeMOnth
    //                 });
    //             }
    //         }

    //         // Get the Sum of Income
    //         let _aprIncomeSum: number = 0;
    //         let aprNet: number = 0;
    //         aprIncome.forEach((item) => _aprIncomeSum += item.amount);

    //         aprNet = _aprIncomeSum - this._AprSum;


    //         // Add April Net to the Net Array
    //         this._NETSum.push({
    //             amount: aprNet,
    //             month: "April"
    //         });
    //     };
    // }
    // static loadMayData(): any {
    //     this._MayExpenses = [];
    //     this._ExpenseSum = [];
    //     //    this._NETSum = [];
    //     let mayIncome = [];
    //     if (DataSource.ExpenseItems) {
    //         for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
    //             let item = DataSource.ExpenseItems[i];

    //             let itemDate = getFieldValue("date", item);
    //             let itemCategory = getFieldValue("category", item);
    //             let itemAmount = getFieldValue("amount", item);
    //             let wholeMOnth = formatDateValue(itemDate);
    //             // get total expense for jan
    //             if (wholeMOnth == "May") {

    //                 this._MayExpenses.push({
    //                     amount: item.amount,
    //                     month: wholeMOnth
    //                 });
    //             }
    //         }
    //         // Get the Sum for the month of Jan
    //         let FebExpItems = this._MayExpenses;
    //         FebExpItems.forEach((item) => this._MaySum += item.amount);
    //         // Push to the ExpenseSum Array
    //         this._ExpenseSum.push({
    //             sum: this._MaySum,
    //             month: "May"
    //         });
    //     }
    //     // Mays Income
    //     if (DataSource.IncomeItems) {
    //         for (let i = 0; i < DataSource.IncomeItems.length; i++) {
    //             let item = DataSource.IncomeItems[i];

    //             let itemDate = getFieldValue("date", item);
    //             let itemCategory = getFieldValue("category", item);
    //             let itemAmount = getFieldValue("amount", item);
    //             let wholeMOnth = formatDateValue(itemDate);
    //             // get total expense for May
    //             if (wholeMOnth == "May") {

    //                 mayIncome.push({
    //                     amount: item.amount,
    //                     month: wholeMOnth
    //                 });
    //             }
    //         }

    //         // Get the Sum of Income
    //         let _MayIncomeSum: number = 0;
    //         let MayNet: number = 0;
    //         mayIncome.forEach((item) => _MayIncomeSum += item.amount);

    //         MayNet = _MayIncomeSum - this._MaySum;


    //         // Add May Net to the Net Array
    //         this._NETSum.push({
    //             amount: MayNet,
    //             month: "May"
    //         });
    //     };
    // }


    // Loads the income data for each month
    // static loadIncomeData(): any {
    //     this._JansIncome = [];
    //     this._FebsIncome = [];
    //     this._IncomeSum = [];
    //     // Loads Income per month
    //     if (DataSource.IncomeItems) {
    //         for (let i = 0; i < DataSource.IncomeItems.length; i++) {
    //             let item = DataSource.IncomeItems[i];

    //             let itemDate = getFieldValue("date", item);
    //             let itemCategory = getFieldValue("category", item);
    //             let itemAmount = getFieldValue("amount", item);
    //             let wholeMOnth = formatDateValue(itemDate);

    //             // Grabs the amount for each month
    //             if (wholeMOnth == this.Months[0]) {
    //                 this._JansIncome.push({
    //                     amount: itemAmount
    //                 });
    //             } else if (wholeMOnth == this.Months[1]) { 
    //                 this._FebsIncome.push({
    //                     amount: itemAmount
    //                 });
    //             }
    //         }
    //         // Get the Sum of Income
    //         let _janIncomeSum: number = 0;
    //         let JanNet: number = 0;
    //         this._JansIncome.forEach((item) => _janIncomeSum += item.amount);
    //         console.log("Jans Income Sum is:  " + _janIncomeSum);
    //     }
    // }

    // Loads the NET for each month
    static loadIncomeData(): any {
        this._IncomeSum = [];
        if (DataSource.IncomeItems) {

            for (let i = 0; i < DataSource.IncomeItems.length; i++) {
                let item = DataSource.IncomeItems[i];
                let itemDate = getFieldValue("date", item);
                let itemCategory = getFieldValue("category", item);
                let itemAmount = getFieldValue("amount", item);
                let wholeMOnth = formatDateValue(itemDate);

                // Switch for Each Month
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
            console.log(this._IncomeSum);

        }

    }
    static loadNETData(): any { }



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
