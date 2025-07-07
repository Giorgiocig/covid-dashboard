import Plot from "react-plotly.js";

export default function LineChart({
  labels,
  data,
}: {
  labels: string[];
  data: number[];
}) {
  return (
    <Plot
      data={[
        {
          type: "scatter",
          mode: "lines+markers",
          x: labels,
          y: data,
          line: { color: "#1E3A8A", width: 3 },
          marker: { size: 6 },
        },
      ]}
      layout={{
        width: 500,
        height: 500,
        title: {
          text: "Time course of deaths for 3 years",
        },
        xaxis: {
          tickmode: "array",
          tickvals: labels,
          ticktext: labels,
          title: { text: "Date", standoff: 15 },
        },
        yaxis: {
          title: {
            text: "Number of Deaths",
            standoff: 15,
          },
        },
      }}
      config={{ responsive: true }}
    />
  );
}
