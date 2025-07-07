import Plot from "react-plotly.js";

export default function WorldMapChart({
  nations,
  data,
}: {
  nations: string[];
  data: number[];
}) {
  return (
    <Plot
      data={[
        {
          type: "choropleth",
          locationmode: data.length === 1 ? "ISO-3" : "country names",
          locations: nations,
          z: data,
          colorscale: [
            [0, "#E0E7FF"], // blu molto chiaro (valore minimo)
            [0.5, "#3B5BA9"], // blu medio (vicino a #1E3A8A schiarito)
            [1, "#1E3A8A"], // blu scuro profondo (valore massimo)
          ],
        },
      ]}
      layout={{
        geo: {
          projection: { type: "natural earth" },
        },
        width: 600,
        height: 500,
      }}
      config={{ responsive: true }}
    />
  );
}
