import { useMemo } from "react";
import { ARRAY_OF_DATE, BASE_URL } from "../utilities";

export const useUrlsForSelect = (selectedNation: string) => {
  return useMemo(
    () =>
      ARRAY_OF_DATE.map(
        (date) => `${BASE_URL}/total?date=${date}&iso=${selectedNation}`
      ),
    [selectedNation]
  );
};
