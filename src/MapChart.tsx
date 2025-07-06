import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import geoData from "./assets/india.json"; // the full FeatureCollection
import type { Feature, Geometry } from "geojson";

interface Props {
  selectedState?: string;
  onSelectState?: (state: string) => void;
  onSelectDistrict?: (district: string) => void;
}

const Map = ({ selectedState, onSelectState, onSelectDistrict }: Props) => {
  const ref = useRef(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous renders

    const width = 800;
    const height = 600;

    const projection = d3.geoMercator().fitSize([width, height], geoData as GeoJSON.FeatureCollection);
    const path = d3.geoPath().projection(projection);

    // Group by state
    const states = d3.group(
      geoData.features as Feature<Geometry, Record<string, unknown>>[],
      (d) => d.properties.st_nm
    );

    states.forEach((features, stateName) => {
      const stateGroup = svg.append("g").attr("data-state", stateName as string);

    stateGroup
      .selectAll("path")
      .data(features)
      .join("path")
      .attr("d", path)
      .attr("fill", selectedState === stateName ? "#f00" : "#ccc")
      .attr("stroke", "#333")
      .attr("stroke-width", () =>
          hoveredState === stateName ? 2 : 1
        )
        .style("cursor", "pointer") 
        .on("mouseenter", function () {
          setHoveredState(stateName as string);
        })
        .on("mouseleave", function () {
          setHoveredState(null);
        })
      .on("click", (event, d) => {
        if (selectedState === stateName) {
          onSelectDistrict?.(d.properties.district as string);
        } else {
          onSelectState?.(stateName as  string);
        }
        event.stopPropagation();
      });
    });

    // Optional: Add background click to deselect
    svg.on("click", () => {
      onSelectState?.("");
    });
  }, [selectedState, hoveredState, onSelectState, onSelectDistrict]);

  return <svg ref={ref} width={800} height={600} />;
};

export default Map;
