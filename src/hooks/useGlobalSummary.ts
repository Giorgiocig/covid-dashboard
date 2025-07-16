import { useMemo } from "react";
import { computeSumma } from "../utilities";

export const useGlobalSummaries = (data: unknown) => {
  return useMemo(() => {
    if (!data) return { confirmedCasesSumma: 0, deathsSumma: 0 };

    return {
      confirmedCasesSumma: computeSumma(data, "confirmed"),
      deathsSumma: computeSumma(data, "deaths"),
    };
  }, [data]);
};
