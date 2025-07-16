import { useMemo } from "react";
import { computeLabelsAndDataForSingleNation } from "../utilities"; // Assicurati del path

export const useSingleNationChartData = (
  objResponseSelect: { [key: string]: any }[]
) => {
  return useMemo(() => {
    if (!Array.isArray(objResponseSelect) || objResponseSelect.length === 0) {
      return {
        labelsSingleNation: [],
        dataDeathSingleNation: [],
        dataConfirmedSingleNation: [],
      };
    }

    const [labels, deaths] =
      computeLabelsAndDataForSingleNation(objResponseSelect);
    const [, confirmed] = computeLabelsAndDataForSingleNation(
      objResponseSelect,
      "confirmed"
    );

    return {
      labelsSingleNation: labels,
      dataDeathSingleNation: deaths,
      dataConfirmedSingleNation: confirmed,
    };
  }, [objResponseSelect]);
};
