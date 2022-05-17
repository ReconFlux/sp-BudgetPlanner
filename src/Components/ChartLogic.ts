import Strings from "../strings";
import { Components } from "gd-sprest-bs";
import { Dashboard, IItemFormCreateProps, Navigation, ItemForm, DataTable } from "dattatable";
import * as jQuery from "jquery";
import * as moment from "moment";
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import { getRelativePosition, resolveObjectKey } from 'chart.js/helpers';
import { ArrayListener } from 'chart.js/helpers';
import { DataSource, ExpenseItem } from "../ds";
import { formatDateValue, getFieldValue } from "../common";

export interface NETItem {
    amount: number;
    month: string;
}
export interface ExpItem {
    amount: number;
    month: string;
}
export interface IncItem {
    amount: number;
    month: string;
}
export interface CATItem {
    amount: number;
    category: string;
}

export class ChartData {


    // Arrays
    // static _ExpenseSum: Array<any> = null;
    // static _NETDiff: Array<any> = null;
    // static _IncomeArray: Array<any> = null;
    static _InitalArray: Array<any> = null;
    // static _CatelogArray: Array<any> = null;

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

    // Numbers for the Category Sums
    static _MortageSum: number = 0;
    static _InternetSum: number = 0;
    static _PhoneSum: number = 0;
    static _CarSum: number = 0;
    static _UtilitySum: number = 0;
    static _MiscSum: number = 0;
    static _LeisureSum: number = 0;
    static _EssentialsSum: number = 0;

    // Loads the Income for each month
    private static _IncomeArray: IncItem[] = null;
    static get IncomeItems(): IncItem[] { return this._IncomeArray }
    static loadIncomeData(): PromiseLike<IncItem[]> {
        return new Promise((resolve, reject) => {
            this._IncomeArray = [];
            if (DataSource.IncomeItems) {
                for (let i = 0; i < DataSource.IncomeItems.length; i++) {
                    let item = DataSource.IncomeItems[i];
                    let itemDate = getFieldValue("date", item);
                    let itemAmount = getFieldValue("amount", item);
                    let wholeMOnth = formatDateValue(itemDate);

                    // Sums for each month
                    switch (wholeMOnth) {
                        case Strings.MonthLabels[0]: {
                            this._JanIncomeSum = this._JanIncomeSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[1]: {
                            this._FebIncomeSum = this._FebIncomeSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[2]: {
                            this._MarIncomeSum = this._MarIncomeSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[3]: {
                            this._AprIncomeSum = this._AprIncomeSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[4]: {
                            this._MayIncomeSum = this._MayIncomeSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[5]: {
                            this._JuneIncomeSum = this._JuneIncomeSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[6]: {
                            this._JulyIncomeSum = this._JulyIncomeSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[7]: {
                            this._AugIncomeSum = this._AugIncomeSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[8]: {
                            this._SeptIncomeSum = this._SeptIncomeSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[9]: {
                            this._OctIncomeSum = this._OctIncomeSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[10]: {
                            this._NovIncomeSum = this._NovIncomeSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[11]: {
                            this._DecIncomeSum = this._DecIncomeSum += itemAmount;
                            break;
                        }
                    }

                }
                if (DataSource.IncomeItems) {
                    // Push sums into an array
                    // Jans
                    this._IncomeArray.push({
                        amount: this._JanIncomeSum,
                        month: Strings.MonthLabels[0]
                    });
                    // Febs
                    this._IncomeArray.push({
                        amount: this._FebIncomeSum,
                        month: Strings.MonthLabels[1]
                    });
                    // Mars
                    this._IncomeArray.push({
                        amount: this._MarIncomeSum,
                        month: Strings.MonthLabels[2]
                    });
                    // Aprs
                    this._IncomeArray.push({
                        amount: this._AprIncomeSum,
                        month: Strings.MonthLabels[3]
                    });
                    // Mays
                    this._IncomeArray.push({
                        amount: this._MayIncomeSum,
                        month: Strings.MonthLabels[4]
                    });
                    // Junes
                    this._IncomeArray.push({
                        amount: this._JuneIncomeSum,
                        month: Strings.MonthLabels[5]
                    });
                    // Julys
                    this._IncomeArray.push({
                        amount: this._JulyIncomeSum,
                        month: Strings.MonthLabels[6]
                    });
                    // Augs
                    this._IncomeArray.push({
                        amount: this._AugIncomeSum,
                        month: Strings.MonthLabels[7]
                    });
                    // Septs
                    this._IncomeArray.push({
                        amount: this._SeptIncomeSum,
                        month: Strings.MonthLabels[8]
                    });
                    // Octs
                    this._IncomeArray.push({
                        amount: this._OctIncomeSum,
                        month: Strings.MonthLabels[9]
                    });
                    // Novs
                    this._IncomeArray.push({
                        amount: this._NovIncomeSum,
                        month: Strings.MonthLabels[10]
                    });
                    // Decs
                    this._IncomeArray.push({
                        amount: this._DecIncomeSum,
                        month: Strings.MonthLabels[11]
                    });
                }
            }
            console.log("Income Array Loaded: ");
            console.log(this._IncomeArray);
            resolve(this.IncomeItems);
        });
    }
    // Loads the Expenses for each month
    private static _ExpenseSum: ExpItem[] = null;
    static get ExpenseItems(): ExpItem[] { return this._ExpenseSum; }
    static loadExpenseData(): PromiseLike<ExpItem[]> {
        return new Promise((resolve, reject) => {
            this._ExpenseSum = [];

            if (DataSource.ExpenseItems) {

                for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
                    let item = DataSource.ExpenseItems[i];
                    let itemDate = getFieldValue("date", item);
                    let itemAmount = getFieldValue("amount", item);
                    let wholeMOnth = formatDateValue(itemDate);

                    // Sums for each month
                    switch (wholeMOnth) {
                        case Strings.MonthLabels[0]: {
                            this._JanEXPSum = this._JanEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[1]: {
                            this._FebEXPSum = this._FebEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[2]: {
                            this._MarEXPSum = this._MarEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[3]: {
                            this._AprEXPSum = this._AprEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[4]: {
                            this._MayEXPSum = this._MayEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[5]: {
                            this._JuneEXPSum = this._JuneEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[6]: {
                            this._JulyEXPSum = this._JulyEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[7]: {
                            this._AugEXPSum = this._AugEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[8]: {
                            this._SeptEXPSum = this._SeptEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[9]: {
                            this._OctEXPSum = this._OctEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[10]: {
                            this._NovEXPSum = this._NovEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[11]: {
                            this._DecEXPSum = this._DecEXPSum += itemAmount;
                            break;
                        }
                    }

                }
                // Push sums into an array
                // Jans
                this._ExpenseSum.push({
                    amount: this._JanEXPSum,
                    month: Strings.MonthLabels[0]
                });
                // Febs
                this._ExpenseSum.push({
                    amount: this._FebEXPSum,
                    month: Strings.MonthLabels[1]
                });
                // Mars
                this._ExpenseSum.push({
                    amount: this._MarEXPSum,
                    month: Strings.MonthLabels[2]
                });
                // Aprs
                this._ExpenseSum.push({
                    amount: this._AprEXPSum,
                    month: Strings.MonthLabels[3]
                });
                // Mays
                this._ExpenseSum.push({
                    amount: this._MayEXPSum,
                    month: Strings.MonthLabels[4]
                });
                // Junes
                this._ExpenseSum.push({
                    amount: this._JuneEXPSum,
                    month: Strings.MonthLabels[5]
                });
                // Julys
                this._ExpenseSum.push({
                    amount: this._JulyEXPSum,
                    month: Strings.MonthLabels[6]
                });
                // Augs
                this._ExpenseSum.push({
                    amount: this._AugEXPSum,
                    month: Strings.MonthLabels[7]
                });
                // Septs
                this._ExpenseSum.push({
                    amount: this._SeptEXPSum,
                    month: Strings.MonthLabels[8]
                });
                // Octs
                this._ExpenseSum.push({
                    amount: this._OctEXPSum,
                    month: Strings.MonthLabels[9]
                });
                // Novs
                this._ExpenseSum.push({
                    amount: this._NovEXPSum,
                    month: Strings.MonthLabels[10]
                });
                // Decs
                this._ExpenseSum.push({
                    amount: this._DecEXPSum,
                    month: Strings.MonthLabels[11]
                });

            }
            console.log("Loaded Expense Array: ");
            console.log(this._ExpenseSum);

            resolve(this.ExpenseItems);
        });
    }

    private static _CatelogArray: CATItem[] = null;
    static get CatelogItems(): CATItem[] { return this._CatelogArray; }
    static loadExpenseCatelog(): PromiseLike<CATItem[]> {
        return new Promise((resolve, reject) => {
            this._CatelogArray = [];

            if (DataSource.TransItems) {
                for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
                    let item = DataSource.ExpenseItems[i];
                    let itemDate = getFieldValue("date", item);
                    let itemCategory = getFieldValue("category", item);
                    let itemAmount = getFieldValue("amount", item);
                    let wholeMOnth = formatDateValue(itemDate);

                    // Sums for each category
                    switch (itemCategory) {
                        case Strings.CategoryLabels[0]: {
                            this._MortageSum = this._MortageSum += itemAmount;
                            break;
                        }
                        case Strings.CategoryLabels[1]: {
                            this._InternetSum = this._InternetSum += itemAmount;
                            break;
                        }
                        case Strings.CategoryLabels[2]: {
                            this._PhoneSum = this._PhoneSum += itemAmount;
                            break;
                        }
                        case Strings.CategoryLabels[3]: {
                            this._CarSum = this._CarSum += itemAmount;
                            break;
                        }
                        case Strings.CategoryLabels[4]: {
                            this._UtilitySum = this._UtilitySum += itemAmount;
                            break;
                        }
                        case Strings.CategoryLabels[5]: {
                            this._MiscSum = this._MiscSum += itemAmount;
                            break;
                        }
                        case Strings.CategoryLabels[6]: {
                            this._LeisureSum = this._LeisureSum += itemAmount;
                            break;
                        }
                        case Strings.CategoryLabels[7]: {
                            this._EssentialsSum = this._EssentialsSum += itemAmount;
                            break;
                        }
                    }
                }
                this._CatelogArray.push({
                    amount: this._MortageSum,
                    category: Strings.CategoryLabels[0]
                });
                this._CatelogArray.push({
                    amount: this._InternetSum,
                    category: Strings.CategoryLabels[1]
                });
                this._CatelogArray.push({
                    amount: this._PhoneSum,
                    category: Strings.CategoryLabels[2]
                });
                this._CatelogArray.push({
                    amount: this._CarSum,
                    category: Strings.CategoryLabels[3]
                });
                this._CatelogArray.push({
                    amount: this._UtilitySum,
                    category: Strings.CategoryLabels[4]
                });
                this._CatelogArray.push({
                    amount: this._MiscSum,
                    category: Strings.CategoryLabels[5]
                });
                this._CatelogArray.push({
                    amount: this._LeisureSum,
                    category: Strings.CategoryLabels[6]
                });
                this._CatelogArray.push({
                    amount: this._EssentialsSum,
                    category: Strings.CategoryLabels[7]
                });
            }
            console.log("Expense Categories Loaded:")
            console.log(this._CatelogArray);
            resolve(this.CatelogItems);
        });
    }

    private static _NETDiff: NETItem[] = null;
    static get NETDiffItems(): NETItem[] { return this._NETDiff }
    static loadNETData(): PromiseLike<NETItem[]> {
        return new Promise((resolve, reject) => {
            //this._NETDiff = [];
            let IncomeArray = this._IncomeArray;
            let ExpArray = this._ExpenseSum;
            if (ExpArray.length > 0 && IncomeArray.length > 0) {
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
                        month: Strings.MonthLabels[0]
                    });
                    this._NETDiff.push({
                        amount: this._FebNETDiff,
                        month: Strings.MonthLabels[1]
                    });
                    this._NETDiff.push({
                        amount: this._MarNETDiff,
                        month: Strings.MonthLabels[2]
                    });
                    this._NETDiff.push({
                        amount: this._AprNETDiff,
                        month: Strings.MonthLabels[3]
                    });
                    this._NETDiff.push({
                        amount: this._MayNETDiff,
                        month: Strings.MonthLabels[4]
                    });
                    this._NETDiff.push({
                        amount: this._JuneNETDiff,
                        month: Strings.MonthLabels[5]
                    });
                    this._NETDiff.push({
                        amount: this._JulyNETDiff,
                        month: Strings.MonthLabels[6]
                    });
                    this._NETDiff.push({
                        amount: this._AugNETDiff,
                        month: Strings.MonthLabels[7]
                    });
                    this._NETDiff.push({
                        amount: this._SeptNETDiff,
                        month: Strings.MonthLabels[8]
                    });
                    this._NETDiff.push({
                        amount: this._OctNETDiff,
                        month: Strings.MonthLabels[9]
                    });
                    this._NETDiff.push({
                        amount: this._NovNETDiff,
                        month: Strings.MonthLabels[10]
                    });
                    this._NETDiff.push({
                        amount: this._DecNETDiff,
                        month: Strings.MonthLabels[11]
                    });
                }
                console.log("Net Differences Loaded: ");
                console.log(this._NETDiff);
            }
            resolve(this.NETDiffItems);
        });
    }

    static LoadData(): PromiseLike<void> {
        return new Promise((resolve, reject) => {
            this.loadIncomeData().then(() => {
                this.loadExpenseData().then(() => {
                    this.loadExpenseCatelog().then(() => {
                        resolve();
                    }, reject);
                }, reject);
            }, reject);
        });
    }

    static ClearData(): PromiseLike<void> {
        return new Promise((resolve, reject) => {
            // call the clearallarray method
            ChartData.clearALLArrays();
            console.log("Loading Expense Array: ");
            console.log(this._ExpenseSum);
            console.log("Income Array Loaded: ");
            console.log(this._IncomeArray);
            console.log("Net Differences Loaded: ");
            console.log(this._NETDiff);
            console.log("Expense Category Loaded: ");
            console.log(this._CatelogArray);

            resolve();
        });
    }

    static clearALLArrays() {
        ChartData._ExpenseSum = [];
        ChartData._NETDiff = [];
        ChartData._IncomeArray = [];
        ChartData._CatelogArray = [];
        // Numbers for the INCOME sums
        ChartData._JanIncomeSum = 0;
        ChartData._FebIncomeSum = 0;
        ChartData._MarIncomeSum = 0;
        ChartData._AprIncomeSum = 0;
        ChartData._MayIncomeSum = 0;
        ChartData._JuneIncomeSum = 0;
        ChartData._JulyIncomeSum = 0;
        ChartData._AugIncomeSum = 0;
        ChartData._SeptIncomeSum = 0;
        ChartData._OctIncomeSum = 0;
        ChartData._NovIncomeSum = 0;
        ChartData._DecIncomeSum = 0;

        // Numbers of the EXPENSE sums
        ChartData._JanEXPSum = 0;
        ChartData._FebEXPSum = 0;
        ChartData._MarEXPSum = 0;
        ChartData._AprEXPSum = 0;
        ChartData._MayEXPSum = 0;
        ChartData._JuneEXPSum = 0;
        ChartData._JulyEXPSum = 0;
        ChartData._AugEXPSum = 0;
        ChartData._SeptEXPSum = 0;
        ChartData._OctEXPSum = 0;
        ChartData._NovEXPSum = 0;
        ChartData._DecEXPSum = 0;

        // Numbers for the NET sums
        ChartData._JanNETDiff = 0;
        ChartData._FebNETDiff = 0;
        ChartData._MarNETDiff = 0;
        ChartData._AprNETDiff = 0;
        ChartData._MayNETDiff = 0;
        ChartData._JuneNETDiff = 0;
        ChartData._JulyNETDiff = 0;
        ChartData._AugNETDiff = 0;
        ChartData._SeptNETDiff = 0;
        ChartData._OctNETDiff = 0;
        ChartData._NovNETDiff = 0;
        ChartData._DecNETDiff = 0;

        // Numbers for the Category Sums
        ChartData._MortageSum = 0;
        ChartData._InternetSum = 0;
        ChartData._PhoneSum = 0;
        ChartData._CarSum = 0;
        ChartData._UtilitySum = 0;
        ChartData._MiscSum = 0;
        ChartData._LeisureSum = 0;
        ChartData._EssentialsSum = 0;
    }

    static loadDefault(): any {

        this._InitalArray = [];
        DataSource.init().then(() => {
            if (DataSource.ExpenseItems) {

                for (let i = 0; i < DataSource.ExpenseItems.length; i++) {
                    let item = DataSource.ExpenseItems[i];
                    let itemDate = getFieldValue("date", item);
                    let itemAmount = getFieldValue("amount", item);
                    let wholeMOnth = formatDateValue(itemDate);

                    // Sums for each month
                    switch (wholeMOnth) {
                        case Strings.MonthLabels[0]: {
                            this._JanEXPSum = this._JanEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[1]: {
                            this._FebEXPSum = this._FebEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[2]: {
                            this._MarEXPSum = this._MarEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[3]: {
                            this._AprEXPSum = this._AprEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[4]: {
                            this._MayEXPSum = this._MayEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[5]: {
                            this._JuneEXPSum = this._JuneEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[6]: {
                            this._JulyEXPSum = this._JulyEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[7]: {
                            this._AugEXPSum = this._AugEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[8]: {
                            this._SeptEXPSum = this._SeptEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[9]: {
                            this._OctEXPSum = this._OctEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[10]: {
                            this._NovEXPSum = this._NovEXPSum += itemAmount;
                            break;
                        }
                        case Strings.MonthLabels[11]: {
                            this._DecEXPSum = this._DecEXPSum += itemAmount;
                            break;
                        }
                    }

                }
                // Push sums into an array
                // Jans
                this._InitalArray.push({
                    amount: this._JanEXPSum,
                    month: Strings.MonthLabels[0]
                });
                // Febs
                this._InitalArray.push({
                    amount: this._FebEXPSum,
                    month: Strings.MonthLabels[1]
                });
                // Mars
                this._InitalArray.push({
                    amount: this._MarEXPSum,
                    month: Strings.MonthLabels[2]
                });
                // Aprs
                this._InitalArray.push({
                    amount: this._AprEXPSum,
                    month: Strings.MonthLabels[3]
                });
                // Mays
                this._InitalArray.push({
                    amount: this._MayEXPSum,
                    month: Strings.MonthLabels[4]
                });
                // Junes
                this._InitalArray.push({
                    amount: this._JuneEXPSum,
                    month: Strings.MonthLabels[5]
                });
                // Julys
                this._InitalArray.push({
                    amount: this._JulyEXPSum,
                    month: Strings.MonthLabels[6]
                });
                // Augs
                this._InitalArray.push({
                    amount: this._AugEXPSum,
                    month: Strings.MonthLabels[7]
                });
                // Septs
                this._InitalArray.push({
                    amount: this._SeptEXPSum,
                    month: Strings.MonthLabels[8]
                });
                // Octs
                this._InitalArray.push({
                    amount: this._OctEXPSum,
                    month: Strings.MonthLabels[9]
                });
                // Novs
                this._InitalArray.push({
                    amount: this._NovEXPSum,
                    month: Strings.MonthLabels[10]
                });
                // Decs
                this._InitalArray.push({
                    amount: this._DecEXPSum,
                    month: Strings.MonthLabels[11]
                });

            }
            console.log("Loaded Initial Array: ");
            console.log(this._InitalArray);
        });


    }
}
