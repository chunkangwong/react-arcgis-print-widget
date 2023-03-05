import { execute } from "@arcgis/core/rest/print";
import PrinteParameters from "@arcgis/core/rest/support/PrintParameters";
import PrintTemplate from "@arcgis/core/rest/support/PrintTemplate";
import { IFormat, ILayout } from "./Print.config";

export const print = async ({
  layout,
  format,
  title,
  view,
  scale,
}: {
  layout: ILayout;
  format: IFormat;
  title: string;
  view: __esri.MapView;
  scale: number;
}) => {
  const printTemplate = new PrintTemplate({
    layout: layout,
    format: format,
    layoutOptions: {
      titleText: title,
    },
    outScale: scale,
  });
  const printParams = new PrinteParameters({
    view,
    template: printTemplate,
  });
  const response = await execute(
    "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
    printParams
  );
  return response;
};
