import { ARRAY_OF_DATE, buildTopRegionsDeathsGraphData } from "./utilities";
import { BASE_URL } from "./utilities";
import { useFetch } from "./hooks/useFetch";
import VerticalBarChart from "./components/graphs/VerticalBarChart";
import LineChart from "./components/graphs/LineChart";
import WorldMapChart from "./components/graphs/WorldMapChart";
import GraphWithLoader from "./components/layout/GraphWithLoader";
import Select from "./components/common/Select";
import { useMultipleFetches } from "./hooks/useMultipleFetch";
import CardContainer from "./components/layout/CardContainer";

import { useState, useMemo, useCallback } from "react";
import StackedBarChart from "./components/graphs/StackBarChart";
import { useGlobalSummaries } from "./hooks/useGlobalSummary";
import { useSingleCardData } from "./hooks/useSingleCardData";
import { useSingleNationChartData } from "./hooks/useSingleDataGraph";
import { useGlobalCardProperties } from "./hooks/useGlobalCardProperties";
import { useSingleNationCardProperties } from "./hooks/useSingleNationCardProperties";
import { useUrlsForSelect } from "./hooks/useUrlsForSelect";
import { useMapChartRange } from "./hooks/useMapChartRange";
import { useArrayOfUniqueLabels } from "./hooks/useArrayOfUniqueLabels";

function App() {
  const [selectedNation, setSelectedNation] = useState("AFG");

  // fetch data
  const { data, isLoading } = useFetch(BASE_URL);

  // fetch data from one nation with Select
  const { data: singleNationData, isLoading: singleNationDataIsLoading } =
    useFetch(selectedNation ? `${BASE_URL}?iso=${selectedNation}` : null);

  // Memoize large computations
  const [graphLabels, graphData] = useMemo(
    () => buildTopRegionsDeathsGraphData(data),
    [data]
  );

  const { confirmedCasesSumma, deathsSumma } = useGlobalSummaries(data);
  const { singleCardDeathsData, singleCardConfirmedCaseData } =
    useSingleCardData(singleNationData);

  // Memoize nation labels computation
  const arrayOfUniqueLabels = useArrayOfUniqueLabels(data);

  // Memoize URLs arrays
  const urls = useMemo(
    () => ARRAY_OF_DATE.map((date) => `${BASE_URL}/total?date=${date}`),
    []
  );

  const urlsForSelect = useUrlsForSelect(selectedNation);

  const { results: objResponseSelect } = useMultipleFetches(urlsForSelect);
  const { results: objResponse } = useMultipleFetches(urls);

  const {
    labelsSingleNation,
    dataDeathSingleNation,
    dataConfirmedSingleNation,
  } = useSingleNationChartData(objResponseSelect);

  const dataOfDate = objResponse.map((obj) => obj.data.deaths);

  // Memoize card properties to prevent unnecessary re-renders
  const globalCardProperties = useGlobalCardProperties({
    deathsSumma,
    confirmedCasesSumma,
    graphLabels,
    isLoading,
  });

  const singleNationCardProperties = useSingleNationCardProperties({
    singleCardDeathsData,
    singleCardConfirmedCaseData,
    singleNationDataIsLoading,
  });

  // Memoize map chart data to prevent unnecessary re-calculations
  const mapChartRange = useMapChartRange(graphData);

  // Optimize the select handler
  const handleNationChange = useCallback((value: string) => {
    setSelectedNation(value);
  }, []);

  return (
    <>
      <p className="text-center text-5xl text-white bg-primary py-4">
        React Covid Dashboards
      </p>
      <div className="flex">
        <div className="flex flex-col gap-20 justify-center">
          <CardContainer properties={globalCardProperties} />
        </div>
        <GraphWithLoader isLoading={isLoading}>
          <VerticalBarChart labels={graphLabels} data={graphData} />
        </GraphWithLoader>
        <GraphWithLoader isLoading={isLoading}>
          <LineChart labels={ARRAY_OF_DATE} data={dataOfDate} />
        </GraphWithLoader>
        <GraphWithLoader isLoading={isLoading}>
          <WorldMapChart nations={graphLabels} data={graphData} />
        </GraphWithLoader>
      </div>
      <div>
        <Select
          arrayForOptions={arrayOfUniqueLabels}
          value={selectedNation}
          setValue={handleNationChange}
        />
        <div className="flex">
          <div className="flex flex-col gap-4 mt-4 items-start">
            <CardContainer properties={singleNationCardProperties} />
          </div>
          <div className="flex">
            <GraphWithLoader isLoading={singleNationDataIsLoading}>
              <WorldMapChart
                nations={[selectedNation]}
                data={[singleCardDeathsData]}
                zmin={mapChartRange.zmin}
                zmax={mapChartRange.zmax}
              />
            </GraphWithLoader>
            <GraphWithLoader isLoading={singleNationDataIsLoading}>
              <LineChart
                labels={labelsSingleNation}
                data={dataDeathSingleNation}
              />
            </GraphWithLoader>
            <GraphWithLoader isLoading={singleNationDataIsLoading}>
              <StackedBarChart
                labels={labelsSingleNation}
                deathsData={dataDeathSingleNation}
                confirmedData={dataConfirmedSingleNation}
              />
            </GraphWithLoader>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
