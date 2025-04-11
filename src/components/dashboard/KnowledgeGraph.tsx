'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const mockNodes = [
  { id: 1, name: 'Mathematics', category: 'domain', level: 3 },
  { id: 2, name: 'Calculus', category: 'subject', level: 2 },
  { id: 3, name: 'Linear Algebra', category: 'subject', level: 2 },
  { id: 4, name: 'Derivatives', category: 'concept', level: 1 },
  { id: 5, name: 'Integrals', category: 'concept', level: 1 },
  { id: 6, name: 'Matrices', category: 'concept', level: 1 },
  { id: 7, name: 'Vectors', category: 'concept', level: 1 },
  { id: 8, name: 'Chain Rule', category: 'topic', level: 0 },
  { id: 9, name: 'Integration by Parts', category: 'topic', level: 0 },
];

const mockLinks = [
  { source: 1, target: 2 },
  { source: 1, target: 3 },
  { source: 2, target: 4 },
  { source: 2, target: 5 },
  { source: 3, target: 6 },
  { source: 3, target: 7 },
  { source: 4, target: 8 },
  { source: 5, target: 9 },
];

type KnowledgeGraphProps = {
  onNodeSelect: (node: any) => void;
};

export default function KnowledgeGraph({ onNodeSelect }: KnowledgeGraphProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 450 });
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const updateDimensions = () => {
      if (!svgRef.current) return;
      const { width, height } = svgRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const { width, height } = dimensions;
    
    // Define colors for different node categories
    const colorScale = d3.scaleOrdinal<string, string>()
      .domain(['domain', 'subject', 'concept', 'topic'])
      .range(['#4299e1', '#9f7aea', '#f6ad55', '#68d391']);
    
    // Define node size based on level
    const sizeScale = d3.scaleLinear()
      .domain([0, 3])
      .range([6, 18]);
    
    // Create the simulation
    const simulation = d3.forceSimulation(mockNodes as any)
      .force('link', d3.forceLink(mockLinks as any).id((d: any) => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius((d: any) => sizeScale(d.level) + 10));
    
    // Draw the links
    const links = svg.append('g')
      .selectAll('line')
      .data(mockLinks)
      .enter()
      .append('line')
      .attr('stroke', '#cbd5e0')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.5);
    
    // Draw the nodes
    const nodes = svg.append('g')
      .selectAll('circle')
      .data(mockNodes)
      .enter()
      .append('circle')
      .attr('r', (d) => sizeScale(d.level))
      .attr('fill', (d) => colorScale(d.category))
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any)
      .on('click', (event, d) => {
        onNodeSelect(d);
      });
    
    // Add node labels
    const labels = svg.append('g')
      .selectAll('text')
      .data(mockNodes)
      .enter()
      .append('text')
      .text((d) => d.name)
      .attr('font-size', 10)
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => sizeScale(d.level) + 12);
    
    // Update positions on simulation tick
    simulation.on('tick', () => {
      links
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
        
      nodes
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);
        
      labels
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });
    
    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [dimensions, onNodeSelect]);
  
  return (
    <div className="w-full h-full">
      <svg 
        ref={svgRef} 
        width="100%" 
        height="100%" 
        className="bg-white dark:bg-gray-800 rounded-lg"
      ></svg>
    </div>
  );
}
