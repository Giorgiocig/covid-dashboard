import { useMemo } from "react";

export const useMapChartRange = (graphData: number[]) => {
  return useMemo(
    () => ({
      zmin: Math.min(...graphData),
      zmax: Math.max(...graphData),
    }),
    [graphData]
  );
};
