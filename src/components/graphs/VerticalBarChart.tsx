import Plot from "react-plotly.js";
import { useContainerObserver } from "../../hooks/useContainerObserverRef";

export default function VerticalBarChart({
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
            type: "bar",
            x: labels,
            y: data,
            marker: {
              color: "#1E3A8A",
            },
          },
        ]}
        layout={{
          width: width,
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
              standoff: 15,
            },
            tick0: 0,
            dtick: 100000,
          },
        }}
      />
    </div>
  );
}
