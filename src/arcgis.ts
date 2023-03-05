import Point from "@arcgis/core/geometry/Point.js";
import Polygon from "@arcgis/core/geometry/Polygon.js";
import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Map from "@arcgis/core/Map";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import MapView from "@arcgis/core/views/MapView";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";

export const featureLayer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Recreation_Parks_view/FeatureServer/0",
});

export const map = new Map({
  basemap: "topo-vector",
  layers: [featureLayer],
});

export const view = new MapView({
  map: map,
  center: [-72.92, 43.28],
  zoom: 2,
});

const scaleBar = new ScaleBar({
  view: view,
  unit: "dual",
});

view.ui.add(scaleBar, {
  position: "bottom-left",
});

view.when(() => {
  const graphic = getGraphic(view);
  view.graphics.add(graphic);
  reactiveUtils.watch(
    () => view.extent,
    () => {
      const graphic = getGraphic(view);
      view.graphics.removeAll();
      view.graphics.add(graphic);
    }
  );
  reactiveUtils.watch(
    () => view.stationary,
    (stationary) => {
      if (stationary) {
        console.log("scale", view.scale);
        console.log("extent", view.extent);
      }
    }
  );
});

const getGraphic = (view: __esri.MapView): __esri.Graphic => {
  const scale = 5000;
  const { x: viewX, y: viewY } = view.center;
  const { x: screenX, y: screenY } = view.toScreen(
    new Point({ x: viewX, y: viewY, spatialReference: view.spatialReference })
  );
  const p1 = { x: screenX - 100, y: screenY - 100 };
  const p2 = { x: screenX - 100, y: screenY + 100 };
  const p3 = { x: screenX + 100, y: screenY - 100 };
  const p4 = { x: screenX + 100, y: screenY + 100 };

  // const minX = view.center.x - (mapDims.x / 2) * scale * unitRatio.x;
  // const minY = view.center.y - (mapDims.y / 2) * scale * unitRatio.y;
  // const maxX = view.center.x + (mapDims.x / 2) * scale * unitRatio.x;
  // const maxY = view.center.y + (mapDims.y / 2) * scale * unitRatio.y;
  // const ringMapArea = [
  //   [minX, minY],
  //   [maxX, minY],
  //   [maxX, maxY],
  //   [minX, maxY],
  //   [minX, minY],
  // ];

  const screenCoords = [p1, p3, p4, p2];
  const mapCoords = screenCoords.map((point) => {
    return view.toMap(point);
  });
  const ring = mapCoords.map((point) => [point.x, point.y]);
  const graphic = new Graphic({
    geometry: new Polygon({
      rings: [ring],
      spatialReference: view.spatialReference,
    }),
    symbol: new SimpleFillSymbol({
      color: [226, 119, 40, 0],
      outline: {
        color: [0, 0, 0],
        width: 15,
      },
    }),
  });
  return graphic;
};
