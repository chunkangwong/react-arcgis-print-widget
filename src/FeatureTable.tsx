import EsriFeatureTable from "@arcgis/core/widgets/FeatureTable";
import { useEffect, useRef, useState } from "react";

interface FeatureTableProps extends __esri.FeatureTableProperties {
  onSelectionChange?: (
    event: __esri.FeatureTableSelectionChangeEvent,
    selectedRows: __esri.Graphic[]
  ) => void;
  singleSelectEnabled?: boolean;
}

const FeatureTable = ({
  onSelectionChange,
  singleSelectEnabled,
  ...props
}: FeatureTableProps) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [selectionChangeEvent, setSelectionChangeEvent] =
    useState<__esri.FeatureTableSelectionChangeEvent>();
  const [selectedRows, setSelectedRows] = useState<__esri.Graphic[]>([]);

  useEffect(() => {
    const featureTable = new EsriFeatureTable({
      ...props,
      container: tableRef.current as HTMLDivElement,
    });

    featureTable.on("selection-change", (event) => {
      setSelectionChangeEvent(event);

      const newSelectedRows: __esri.Graphic[] = (
        featureTable as any
      ).grid.selectedItems._items.map((item: any) => item.feature);
      setSelectedRows(newSelectedRows);

      if (singleSelectEnabled && event.added.length > 0) {
        const selectedObjectIds = (
          featureTable as any
        ).grid.selectedItems.items.map((item: any) => item.objectId);
        featureTable.deselectRows(
          selectedObjectIds.filter(
            (id: number) => id !== (event.added[0] as any).objectId
          )
        );
      }
    });
  }, []);

  useEffect(() => {
    if (selectionChangeEvent && onSelectionChange) {
      onSelectionChange(selectionChangeEvent, selectedRows);
    }
  }, [selectionChangeEvent]);

  return (
    <div
      ref={tableRef}
      style={{
        height: "100%",
      }}
    ></div>
  );
};

export default FeatureTable;
