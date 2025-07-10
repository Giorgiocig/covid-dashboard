import Plot from "react-plotly.js";

export default function VerticalBarChart({
  labels,
  data,
}: {
  labels: string[];
  data: number[];
}) {
  return (
    <>
      <Plot
        data={[
          {
            type: "bar",
            x: labels,
            y: data,
            marker: {
              color: "#1E3A8A",
            },
          },
        ]}
        layout={{
          width: 500,
          height: 500,
          title: {
            text: "Top 10 nations per number of deaths",
          },
          xaxis: {
            title: { text: "Nations", standoff: 15 },
          },
          yaxis: {
            title: {
              text: "Number of Deaths",
              standoff: 15, // <-- Aggiunge distanza tra il titolo e i tick dell’asse Y
            },
            tick0: 0,
            dtick: 100000,
          },
        }}
      />
    </>
  );
}
