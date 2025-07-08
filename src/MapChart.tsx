import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import geoData from "./assets/india.json";
import type { Feature, Geometry } from "geojson";
import { useTheme } from '@radix-ui/themes'; // Import useTheme hook

interface Props {
  selectedState?: string;
  onSelectState?: (state: string) => void;
  onSelectDistrict?: (district: string) => void;
}

const Map = ({ selectedState, onSelectState, onSelectDistrict }: Props) => {
  const ref = useRef<SVGSVGElement>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const theme = useTheme(); // Access theme properties

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current && ref.current.parentElement) {
        const parentWidth = ref.current.parentElement.clientWidth;
        const newWidth = parentWidth > 0 ? parentWidth : 800;
        const newHeight = newWidth * 0.75; // Maintain aspect ratio
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!ref.current || dimensions.width === 0 || dimensions.height === 0 || !theme) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    svg.attr('width', dimensions.width).attr('height', dimensions.height);

    const projection = d3.geoMercator().fitSize([dimensions.width, dimensions.height], geoData as GeoJSON.FeatureCollection);
    const pathGenerator = d3.geoPath().projection(projection);

    const states = d3.group(
      geoData.features as Feature<Geometry, Record<string, unknown>>[],
      (d) => d.properties.st_nm as string
    );

    // Use Radix theme variables. Ensure your theme has these colors defined.
    // These are examples; you might need to adjust them based on your Radix theme setup.
    // Fallbacks are provided if CSS variables are not found.
    const unselectedFill = `var(--gray-3, #f0f0f0)`;
    const selectedFill = `var(--accent-9, #E53E3E)`; // Default to a red if accent-9 is not set
    const hoverFill = `var(--accent-8, #FC8181)`;    // Default to a lighter red
    const strokeColor = `var(--gray-6, #ccc)`;
    const selectedStrokeColor = `var(--accent-10, #C53030)`; // Darker red for selected stroke

    states.forEach((features, stateName) => {
      const isSelected = selectedState === stateName;
      const isHovered = hoveredState === stateName;

      svg.append("g")
        .attr("data-state", stateName)
        .selectAll("path")
        .data(features)
        .join("path")
        .attr("d", pathGenerator)
        .style("fill", isSelected ? selectedFill : (isHovered ? hoverFill : unselectedFill))
        .style("stroke", isSelected ? selectedStrokeColor : strokeColor)
        .style("stroke-width", isSelected || isHovered ? 1.5 : 0.7)
        .style("cursor", "pointer")
        .on("mouseenter", function () {
          setHoveredState(stateName);
          if (!isSelected) {
            d3.select(this).style("fill", hoverFill).style("stroke-width", 1.5);
          } else {
            d3.select(this).style("stroke-width", 1.5);
          }
        })
        .on("mouseleave", function () {
          setHoveredState(null);
          if (!isSelected) {
            d3.select(this).style("fill", unselectedFill).style("stroke-width", 0.7);
          } else {
            d3.select(this).style("fill", selectedFill).style("stroke-width", 1.5);
          }
        })
        .on("click", (event, d) => {
          event.stopPropagation();
          if (isSelected) {
            onSelectDistrict?.(d.properties.district as string);
          } else {
            onSelectState?.(stateName);
          }
        });
    });

    svg.on("click", () => {
      onSelectState?.("");
    });

  }, [selectedState, hoveredState, onSelectState, onSelectDistrict, dimensions, theme]);

  return <svg ref={ref} style={{ display: 'block', width: '100%', backgroundColor: 'var(--gray-1)' }} />;
};

export default Map;