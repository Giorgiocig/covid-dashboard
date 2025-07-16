import { useMemo } from "react";
import { computeLabelsAndDataGraphs } from "../utilities";

export const useArrayOfUniqueLabels = (data: { [key: string]: any }[]) => {
  return useMemo(() => {
    if (!data) return [];
    const [allnationsLabels] = computeLabelsAndDataGraphs(data, "region.iso");
    return [...new Set(allnationsLabels)].sort();
  }, [data]);
};
