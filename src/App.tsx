import {
  ARRAY_OF_DATE,
  computeLabelsAndDataGraphs,
  computeSingleCardValue,
  computeSumma,
  formatter,
  sortAndSliceArray,
} from "./utilities";
import { BASE_URL } from "./utilities";
import { useFetch } from "./hooks/useFetch";
import VerticalBarChart from "./components/graphs/VerticalBarChart";
import LineChart from "./components/graphs/LineChart";
import WorldMapChart from "./components/graphs/WorldMapChart";
import GraphWithLoader from "./components/layout/GraphWithLoader";
import { useMemo, useState } from "react";
import Select from "./components/common/Select";
import { useMultipleFetches } from "./hooks/useMultipleFetch";
import CardContainer from "./components/layout/CardContainer";

function App() {
  const [selectedNation, setSelectedNation] = useState("AFG");
  // fetch all data
  const { data, isLoading } = useFetch(BASE_URL);
  // fetch data from one nation with Select and selectedNation
  const { data: singleNationData, isLoading: singleNationDataIsLoading } =
    useFetch(selectedNation ? `${BASE_URL}?iso=${selectedNation}` : null);

  const tenStateWithMaxDeaths = sortAndSliceArray(data, "deaths");
  console.log(tenStateWithMaxDeaths);
  const [labels, dataGraph] = computeLabelsAndDataGraphs(
    tenStateWithMaxDeaths,
    "region.iso",
    "deaths"
  );

  const [nations, _] = computeLabelsAndDataGraphs(
    tenStateWithMaxDeaths,
    "region.name",
    "deaths"
  );
  console.log(dataGraph);
  const [allnationsLabels] = computeLabelsAndDataGraphs(data, "region.iso");
  const arrayOfUniqueLabels = [...new Set(allnationsLabels)].sort();

  const confirmedCasesSumma = computeSumma(data, "confirmed");
  const deathsSumma = computeSumma(data, "deaths");

  const urls = useMemo(
    () => ARRAY_OF_DATE.map((date) => `${BASE_URL}/total?date=${date}`),
    []
  );
  const { results: objResponse } = useMultipleFetches(urls);

  let dataOfDate = [];
  for (const obj of objResponse) {
    dataOfDate.push(obj.data.deaths);
  }

  const singleCardDeathsData = computeSingleCardValue(
    singleNationData,
    "deaths"
  );
  const singleCardConfirmedCaseData = computeSingleCardValue(
    singleNationData,
    "confirmed"
  );

  return (
    <>
      <p className="text-center text-5xl text-white bg-primary py-4">
        React Covid Dashboards
      </p>
      <div className="flex">
        <div className="flex flex-col gap-20 justify-center">
          <CardContainer
            properties={[
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
                data: nations[0],
                isLoading: isLoading,
              },
            ]}
          />
        </div>
        <GraphWithLoader isLoading={isLoading}>
          <VerticalBarChart labels={labels} data={dataGraph} />
        </GraphWithLoader>
        <GraphWithLoader isLoading={isLoading}>
          <LineChart labels={ARRAY_OF_DATE} data={dataOfDate} />
        </GraphWithLoader>
        <GraphWithLoader isLoading={isLoading}>
          <WorldMapChart nations={nations} data={dataGraph} />
        </GraphWithLoader>
      </div>
      <div>
        <Select
          arrayForOptions={arrayOfUniqueLabels}
          value={selectedNation}
          setValue={setSelectedNation}
        />
        <div className="flex">
          <div className="flex flex-col gap-4 mt-4 items-start">
            <CardContainer
              properties={[
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
              ]}
            />
          </div>
          <div>
            <GraphWithLoader isLoading={singleNationDataIsLoading}>
              <WorldMapChart
                nations={[selectedNation]}
                data={[singleCardDeathsData]}
                zmin={Math.min(...dataGraph)}
                zmax={Math.max(...dataGraph)}
              />
            </GraphWithLoader>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
