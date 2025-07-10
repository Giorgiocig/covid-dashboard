import Plot from "react-plotly.js";

export default function StackedBarChart({
  labels,
  deathsData,
  confirmedData,
}: {
  labels: string[];
  deathsData: number[];
  confirmedData: number[];
}) {
  return (
    <Plot
      data={[
        {
          x: labels,
          y: confirmedData,
          name: "Confirmed Cases",
          type: "bar",
          marker: { color: "#60A5FA" },
        },
        {
          x: labels,
          y: deathsData,
          name: "Deaths",
          type: "bar",
          marker: { color: "#1E3A8A" },
        },
      ]}
      layout={{
        barmode: "group",
        title: { text: "Confirmed Cases and Deaths by Country" },
        width: 600,
        height: 500,
        xaxis: {
          title: { text: "Countries" },
          tickmode: "array",
          tickvals: labels,
          ticktext: labels,
        },
        yaxis: {
          title: { text: "Number of Cases" },
        },
        legend: {
          x: 0,
          y: 1,
          xanchor: "left",
          yanchor: "top",
          orientation: "v",
        },
      }}
    />
  );
}
