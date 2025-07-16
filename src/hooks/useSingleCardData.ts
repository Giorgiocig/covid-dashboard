import { useMemo } from "react";
import { computeSingleCardValue } from "../utilities";

export const useSingleCardData = (data: { [key: string]: any }[]) => {
  return useMemo(() => {
    if (!Array.isArray(data))
      return { singleCardDeathsData: 0, singleCardConfirmedCaseData: 0 };

    return {
      singleCardDeathsData: computeSingleCardValue(data, "deaths"),
      singleCardConfirmedCaseData: computeSingleCardValue(data, "confirmed"),
    };
  }, [data]);
};
