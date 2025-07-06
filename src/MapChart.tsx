import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import geoData from "./assets/india.json"; // The full FeatureCollection
import type { Feature, Geometry } from "geojson";

interface Props {
  selectedState?: string;
  onSelectState?: (state: string) => void;
  onSelectDistrict?: (district: string) => void;
}

const Map = ({ selectedState, onSelectState, onSelectDistrict }: Props) => {
  const ref = useRef<SVGSVGElement>(null); // Typed ref
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return; // Ensure ref is available

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous renders

    // Make map responsive: Use parent container's size
    const container = ref.current.parentElement;
    const width = container ? container.clientWidth : 800;
    const height = container ? container.clientHeight : 600;

    if (width === 0 || height === 0) return; // Don't render if container has no size

    svg.attr('width', width).attr('height', height); // Set SVG dimensions

    const projection = d3.geoMercator().fitSize([width, height], geoData as GeoJSON.FeatureCollection);
    const pathGenerator = d3.geoPath().projection(projection);

    const states = d3.group(
      geoData.features as Feature<Geometry, Record<string, unknown>>[],
      (d) => d.properties.st_nm as string // Ensure state name is string
    );

    states.forEach((features, stateName) => {
      const stateGroup = svg.append("g").attr("data-state", stateName);

      stateGroup
        .selectAll("path")
        .data(features)
        .join("path")
        .attr("d", pathGenerator) // Use the path generator
        .attr("fill", selectedState === stateName ? "var(--primary-red)" : "#555") // Darker grey for unselected states
        .attr("stroke", "var(--dark-bg)") // Use dark background for stroke for contrast
        .attr("stroke-width", hoveredState === stateName ? 2.5 : 1) // Thicker stroke on hover
        .style("cursor", "pointer")
        .on("mouseenter", function () {
          setHoveredState(stateName);
          d3.select(this).attr("fill", "var(--secondary-red)"); // Lighter red on hover
        })
        .on("mouseleave", function () {
          setHoveredState(null);
          if (selectedState !== stateName) {
            d3.select(this).attr("fill", "#555"); // Revert to base if not selected
          } else {
            d3.select(this).attr("fill", "var(--primary-red)"); // Revert to selected color
          }
        })
        .on("click", (event, d) => {
          if (selectedState === stateName) {
            // If already selected, clicking a district (if applicable) or deselecting state
            // For simplicity, let's assume district selection is handled or state deselects
            onSelectDistrict?.(d.properties.district as string);
          } else {
            onSelectState?.(stateName);
          }
          event.stopPropagation();
        });
    });

    // Background click to deselect state
    svg.on("click", () => {
      onSelectState?.(""); // Clear selected state
    });

  }, [selectedState, hoveredState, onSelectState, onSelectDistrict]); // Rerun on these dependencies

  // Ensure SVG takes full space of its container for responsiveness
  // The width/height will be set by the useEffect based on parent size
  return <svg ref={ref} style={{ display: 'block', width: '100%', height: '100%', minHeight: '400px' }} />;
};

export default Map;
