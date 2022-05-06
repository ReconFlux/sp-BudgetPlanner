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
    GlobalVariable: "SPDashboard",
    Lists: {
        Main: "Transactions"
    },
    ProjectName: "Budget Planner",
    ProjectDescription: "A Budget Planner that is developed for SharePoint 2013/2016/Online.",
    SolutionUrl: ContextInfo.webServerRelativeUrl + "/SiteAssets/sp-BudgetPlanner/index.html",
    SourceUrl: ContextInfo.webServerRelativeUrl,
    DateFormat: "MMMM",
    TimeFormat: "MM/DD/YYYY HH:mm:ss",


    Version: "7.4",

};
export default Strings;