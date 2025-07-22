import Plot from "react-plotly.js";
import { useContainerObserver } from "../../hooks/useContainerObserverRef";

export default function WorldMapChart({
  nations,
  data,
  zmin,
  zmax,
}: {
  nations: string[];
  data: number[];
  zmin?: number;
  zmax?: number;
}) {
  const [width, containerRef] = useContainerObserver(600);

  return (
    <div ref={containerRef} className="w-full h-[500px]">
      <Plot
        data={[
          {
            type: "choropleth",
            locationmode: "ISO-3",
            locations: nations,
            z: data,
            zmin: zmin,
            zmax: zmax,
            colorscale: [
              [0, "#E0E7FF"],
              [0.2, "#93C5FD"],
              [0.5, "#3B82F6"],
              [0.8, "#1D4ED8"],
              [1, "#1E3A8A"],
            ],
          },
        ]}
        layout={{
          geo: {
            projection: { type: "natural earth" },
          },
          width: width,
          height: 500,
        }}
        config={{ responsive: true }}
      />
    </div>
  );
}
