import { ContextInfo } from "gd-sprest-bs";

// Sets the context information
// This is for SPFx or Teams solutions
export const setContext = (context, sourceUrl?: string) => {
    // Set the context
    ContextInfo.setPageContext(context.pageContext);

    // Update the source url
    Strings.SourceUrl = sourceUrl || ContextInfo.webServerRelativeUrl;
}

/**
 * Global Constants
 */
const Strings = {
    AppElementId: "sp-BudgetPlanner",
    GlobalVariable: "SPBudgetPlanner",
    Lists: {
        Main: "Transactions"
    },
    ProjectName: "Budget Planner",
    ProjectDescription: "A Budget Planner that is developed for SharePoint 2013/2016/Online.",
    SolutionUrl: ContextInfo.webServerRelativeUrl + "/SiteAssets/sp-BudgetPlanner/index.html",
    SourceUrl: ContextInfo.webServerRelativeUrl,
    DateFormat: "MMMM",
    TimeFormat: "MM/DD/YYYY HH:mm:ss",

    // Data Logic
    isActive: "active",
    MonthLabels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    CategoryLabels: ["Mortage", "Internet", "Phone", "Car", "Utility", "Misc.", "Leisure", "Essentials"],
    ChartLabels: ["Monthly Expenses", "Monthly Net Differences", "Expense Categories", "Monthly Income", "Monthly Savings"],

    Version: "2.8.3",

};
export default Strings;