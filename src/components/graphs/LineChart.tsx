import Plot from "react-plotly.js";
import { useContainerObserver } from "../../hooks/useContainerObserverRef";
export default function LineChart({
  labels,
  data,
}: {
  labels: string[];
  data: number[];
}) {
  const [width, containerRef] = useContainerObserver(600);
  return (
    <div ref={containerRef} className="w-full h-[500px]">
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
          width: width,
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
    </div>
  );
}
