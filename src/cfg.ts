import { Helper, SPTypes } from "gd-sprest-bs";
import Strings from "./strings";

/**
 * SharePoint Assets
 */
export const Configuration = Helper.SPConfig({
    ListCfg: [
        {
            ListInformation: {
                Title: Strings.Lists.Main,
                BaseTemplate: SPTypes.ListTemplateType.GenericList
            },
            ContentTypes: [
                {
                    Name: "Transaction",
                    FieldRefs: [
                        "date", "amount", "category"
                    ]
                }
            ],
            CustomFields: [
                {
                    name: "date",
                    title: "Date",
                    type: Helper.SPCfgFieldType.Date,
                    displayFormat: SPTypes.DateFormat.DateOnly,
                    required: true,
                } as Helper.IFieldInfoDate,
                {
                    name: "amount",
                    title: "Amount",
                    type: Helper.SPCfgFieldType.Number,
                    required: false,
                    description: "Enter your Amount. i.e. 2500.00"
                } as Helper.IFieldInfoNumber,
                {
                    name: "category",
                    title: "Transaction Category",
                    type: Helper.SPCfgFieldType.Choice,
                    required: false,
                    choices: ["Mortage", "Internet", "Phone", "Car", "Utility", "Misc.", "Leisure", "Essentials", "Income"]
                } as Helper.IFieldInfoChoice,
            ],
            ViewInformation: [
                {
                    ViewName: "All Items",
                    ViewFields: [
                        "date", "amount", "category"
                    ]
                }
            ],
            onCreated: (list) => {
                list.Fields("Title").update({ Required: false }).execute(
                    // Success
                    () => {
                        // Load
                        console.log("The 'Title' Field is no longer required.");
                    },
                    ex => {
                        // Load
                        console.log("Error: Unable to change 'Title' Requirements Property.");
                    }
                )
            }
        }
    ]
});

// Adds the solution to a classic page
Configuration["addToPage"] = (pageUrl: string) => {
    // Add a content editor webpart to the page
    Helper.addContentEditorWebPart(pageUrl, {
        contentLink: Strings.SolutionUrl,
        description: Strings.ProjectDescription,
        frameType: "None",
        title: Strings.ProjectName
    }).then(
        // Success
        () => {
            // Load
            console.log("[" + Strings.ProjectName + "] Successfully added the solution to the page.", pageUrl);
        },

        // Error
        ex => {
            // Load
            console.log("[" + Strings.ProjectName + "] Error adding the solution to the page.", ex);
        }
    );
}