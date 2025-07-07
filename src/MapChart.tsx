import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import geoData from "./assets/india.json";
import type { Feature, Geometry } from "geojson";

interface Props {
  selectedState?: string;
  onSelectState?: (state: string) => void;
  onSelectDistrict?: (district: string) => void;
}

const Map = ({ selectedState, onSelectState, onSelectDistrict }: Props) => {
  const ref = useRef<SVGSVGElement>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current && ref.current.parentElement) {
        const parentWidth = ref.current.parentElement.clientWidth;
        // Maintain aspect ratio, e.g., 4:3, or ensure it fits well
        const newWidth = parentWidth > 0 ? parentWidth : 800; // Fallback width
        const newHeight = newWidth * 0.75; // Maintain aspect ratio
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    updateDimensions(); // Initial call
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);


  useEffect(() => {
    if (!ref.current || dimensions.width === 0 || dimensions.height === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous renders

    svg.attr('width', dimensions.width).attr('height', dimensions.height);

    const projection = d3.geoMercator().fitSize([dimensions.width, dimensions.height], geoData as GeoJSON.FeatureCollection);
    const pathGenerator = d3.geoPath().projection(projection);

    const states = d3.group(
      geoData.features as Feature<Geometry, Record<string, unknown>>[],
      (d) => d.properties.st_nm as string
    );

    // Using refined CSS variables
    const unselectedFill = getComputedStyle(document.documentElement).getPropertyValue('--light-bg-alt').trim() || '#f0f0f0'; // Very light gray
    const selectedFill = getComputedStyle(document.documentElement).getPropertyValue('--primary-red').trim(); // Subtle primary red
    const hoverFill = getComputedStyle(document.documentElement).getPropertyValue('--secondary-red').trim();   // Subtle secondary red
    // For strokes, use a slightly darker border color or white depending on contrast needs with unselectedFill
    const strokeColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim() || '#ccc';
    const selectedStrokeColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-red').trim();


    states.forEach((features, stateName) => {
      const isSelected = selectedState === stateName;
      const isHovered = hoveredState === stateName;

      svg.append("g")
        .attr("data-state", stateName)
        .selectAll("path")
        .data(features)
        .join("path")
        .attr("d", pathGenerator)
        .attr("fill", isSelected ? selectedFill : (isHovered ? hoverFill : unselectedFill))
        .attr("stroke", isSelected ? selectedStrokeColor : strokeColor)
        .attr("stroke-width", isSelected || isHovered ? 1.5 : 0.7) // Slightly thicker for selected/hovered
        .style("cursor", "pointer")
        .on("mouseenter", function () {
          setHoveredState(stateName);
          if (!isSelected) { // Only change fill if not already selected
            d3.select(this).attr("fill", hoverFill).attr("stroke-width", 1.5);
          } else {
             d3.select(this).attr("stroke-width", 1.5); // Ensure stroke thickens
          }
        })
        .on("mouseleave", function () {
          setHoveredState(null);
          if (!isSelected) { // Revert if not selected
            d3.select(this).attr("fill", unselectedFill).attr("stroke-width", 0.7);
          } else { // Revert to selected style
             d3.select(this).attr("fill", selectedFill).attr("stroke-width", 1.5);
          }
        })
        .on("click", (event, d) => {
          event.stopPropagation(); // Prevent background click
          if (isSelected) {
            onSelectDistrict?.(d.properties.district as string);
          } else {
            onSelectState?.(stateName);
          }
        });
    });

    svg.on("click", () => { // Background click to deselect
      onSelectState?.("");
    });

  }, [selectedState, hoveredState, onSelectState, onSelectDistrict, dimensions]);

  // SVG style for responsiveness, height will be controlled by `dimensions` state
  return <svg ref={ref} style={{ display: 'block', width: '100%'}} />;
};

export default Map;
