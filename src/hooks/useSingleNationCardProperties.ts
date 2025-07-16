import { useMemo } from "react";

export const useSingleNationCardProperties = ({
  singleCardDeathsData,
  singleCardConfirmedCaseData,
  singleNationDataIsLoading,
}: {
  singleCardDeathsData: number;
  singleCardConfirmedCaseData: number;
  singleNationDataIsLoading: boolean;
}) => {
  return useMemo(
    () => [
      {
        text: "Deaths",
        data: singleCardDeathsData,
        isLoading: singleNationDataIsLoading,
      },
      {
        text: "Confirmed",
        data: singleCardConfirmedCaseData,
        isLoading: singleNationDataIsLoading,
      },
    ],
    [
      singleCardDeathsData,
      singleCardConfirmedCaseData,
      singleNationDataIsLoading,
    ]
  );
};
