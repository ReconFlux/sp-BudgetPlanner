import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

//import styles from './BudgetPlannerWebPart.module.scss';
import * as strings from 'BudgetPlannerWebPartStrings';

// Reference the solution
import "../../../../dist/sp-BudgetPlanner.min.js";
declare var SPBudgetPlanner;

export interface IBudgetPlannerWebPartProps {
  description: string;
}

export default class BudgetPlannerWebPart extends BaseClientSideWebPart<IBudgetPlannerWebPartProps> {

  public render(): void {
    // render the app
    SPBudgetPlanner.render(this.domElement, this.context);
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
