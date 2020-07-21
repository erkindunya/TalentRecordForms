import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TalentRecordFormsWebPartStrings';
import TalentRecordForms from './components/TalentRecordForms';
import { ITalentRecordFormsProps } from './components/ITalentRecordFormsProps';

export interface ITalentRecordFormsWebPartProps {
  description: string;
}

export default class TalentRecordFormsWebPart extends BaseClientSideWebPart <ITalentRecordFormsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITalentRecordFormsProps> = React.createElement(
      TalentRecordForms,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

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
