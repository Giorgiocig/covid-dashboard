import { useMemo } from "react";
import { formatter } from "../utilities";

export const useGlobalCardProperties = ({
  isLoading,
  deathsSumma,
  confirmedCasesSumma,
  graphLabels,
}: {
  isLoading: boolean;
  deathsSumma: number;
  confirmedCasesSumma: number;
  graphLabels: string[];
}) => {
  return useMemo(
    () => [
      {
        text: "Total number of deaths",
        data: formatter.format(deathsSumma),
        isLoading: isLoading,
      },
      {
        text: "Confirmed cases",
        data: formatter.format(confirmedCasesSumma),
        isLoading: isLoading,
      },
      {
        text: "Most affected nation",
        data: graphLabels[0],
        isLoading: isLoading,
      },
    ],
    [deathsSumma, confirmedCasesSumma, graphLabels, isLoading]
  );
};
