import { ARRAY_OF_DATE, buildTopRegionsDeathsGraphData } from "./utilities";
import { BASE_URL } from "./utilities";
import { useFetch } from "./hooks/useFetch";
import VerticalBarChart from "./components/graphs/VerticalBarChart";
import LineChart from "./components/graphs/LineChart";
import WorldMapChart from "./components/graphs/WorldMapChart";
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
import { Activity, Globe2, BarChart3 } from "lucide-react";
import GraphWithSkeleton from "./components/layout/GraphWithSkeleton";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-4">
            <Activity className="h-12 w-12" />
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              React COVID Dashboard
            </h1>
            <Globe2 className="h-12 w-12" />
          </div>
          <p className="text-center text-blue-100 mt-2 text-lg">
            Global monitoring of covid-19 disease
          </p>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-12">
        {/* Global staistics */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Global statistics
            </h2>
          </div>

          <div className="mb-8">
            <CardContainer properties={globalCardProperties} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full">
            <div className="min-w-0">
              <GraphWithSkeleton isLoading={isLoading}>
                <VerticalBarChart labels={graphLabels} data={graphData} />
              </GraphWithSkeleton>
            </div>

            <GraphWithSkeleton isLoading={isLoading}>
              <div className="min-w-0">
                <LineChart labels={ARRAY_OF_DATE} data={dataOfDate} />
              </div>
            </GraphWithSkeleton>

            <GraphWithSkeleton isLoading={isLoading}>
              <div className="min-w-0">
                <WorldMapChart nations={graphLabels} data={graphData} />
              </div>
            </GraphWithSkeleton>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200 my-12"></div>

        {/* Country analysis */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Globe2 className="h-8 w-8 text-indigo-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Country Analysis
            </h2>
          </div>

          <Select
            arrayForOptions={arrayOfUniqueLabels}
            value={selectedNation}
            setValue={handleNationChange}
          />

          <>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                data for {selectedNation}
              </h3>
              <CardContainer properties={singleNationCardProperties} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <GraphWithSkeleton isLoading={singleNationDataIsLoading}>
                <WorldMapChart
                  nations={[selectedNation]}
                  data={[singleCardDeathsData]}
                  zmin={mapChartRange.zmin}
                  zmax={mapChartRange.zmax}
                />
              </GraphWithSkeleton>

              <GraphWithSkeleton isLoading={singleNationDataIsLoading}>
                <LineChart
                  labels={labelsSingleNation}
                  data={dataDeathSingleNation}
                />
              </GraphWithSkeleton>

              <GraphWithSkeleton isLoading={singleNationDataIsLoading}>
                <StackedBarChart
                  labels={labelsSingleNation}
                  deathsData={dataDeathSingleNation}
                  confirmedData={dataConfirmedSingleNation}
                />
              </GraphWithSkeleton>
            </div>
          </>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">React COVID Dashboard - Updated Data</p>
          <p className="text-gray-400 text-sm mt-2">
            Developped with React and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
