"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PacingDataPoint {
  chapter: string;
  section: string;
  tension: number;
  pacing: number;
  engagement: number;
  wordCount: number;
  position: number;
}

interface PacingHeatmapProps {
  data?: PacingDataPoint[];
  className?: string;
}

// Mock data for demonstration
const mockPacingData: PacingDataPoint[] = [
  { chapter: 'Ch 1', section: 'Opening', tension: 65, pacing: 70, engagement: 80, wordCount: 3200, position: 0 },
  { chapter: 'Ch 1', section: 'Hook', tension: 85, pacing: 90, engagement: 95, wordCount: 2800, position: 1 },
  { chapter: 'Ch 2', section: 'Setup', tension: 45, pacing: 60, engagement: 55, wordCount: 4100, position: 2 },
  { chapter: 'Ch 2', section: 'Development', tension: 55, pacing: 65, engagement: 60, wordCount: 3600, position: 3 },
  { chapter: 'Ch 3', section: 'Conflict', tension: 80, pacing: 85, engagement: 90, wordCount: 3900, position: 4 },
  { chapter: 'Ch 3', section: 'Escalation', tension: 90, pacing: 95, engagement: 85, wordCount: 3400, position: 5 },
  { chapter: 'Ch 4', section: 'Lull', tension: 30, pacing: 40, engagement: 35, wordCount: 4200, position: 6 },
  { chapter: 'Ch 4', section: 'Reflection', tension: 25, pacing: 35, engagement: 30, wordCount: 3800, position: 7 },
  { chapter: 'Ch 5', section: 'Rising Action', tension: 75, pacing: 80, engagement: 75, wordCount: 3700, position: 8 },
  { chapter: 'Ch 5', section: 'Climax Build', tension: 90, pacing: 95, engagement: 85, wordCount: 3300, position: 9 },
  { chapter: 'Ch 6', section: 'Climax', tension: 95, pacing: 90, engagement: 95, wordCount: 2900, position: 10 },
  { chapter: 'Ch 6', section: 'Resolution', tension: 60, pacing: 70, engagement: 75, wordCount: 3500, position: 11 },
];

export default function PacingHeatmap({ data = mockPacingData, className }: PacingHeatmapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedPoint, setSelectedPoint] = useState<PacingDataPoint | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeMetric, setActiveMetric] = useState<'tension' | 'pacing' | 'engagement'>('tension');

  // Color mapping for different intensity levels
  const getHeatmapColor = (value: number, metric: string) => {
    const intensity = value / 100;
    
    switch (metric) {
      case 'tension':
        return `rgba(239, 68, 68, ${intensity})`; // Red spectrum
      case 'pacing':
        return `rgba(59, 130, 246, ${intensity})`; // Blue spectrum
      case 'engagement':
        return `rgba(16, 185, 129, ${intensity})`; // Green spectrum
      default:
        return `rgba(107, 114, 128, ${intensity})`; // Gray spectrum
    }
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setZoomLevel(1);
    setSelectedPoint(null);
  };

  return (
    <Card className={cn("neo-brutal-card", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-museo flex items-center space-x-2">
              <span>Pacing Heatmap</span>
              <Badge variant="outline" className="text-xs">
                Interactive
              </Badge>
            </CardTitle>
            <CardDescription className="text-base">
              Visualize narrative rhythm, tension, and engagement across your manuscript
            </CardDescription>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Metric Selection */}
        <div className="flex items-center space-x-2 mt-4">
          <span className="text-sm font-medium text-payne">View:</span>
          {(['tension', 'pacing', 'engagement'] as const).map((metric) => (
            <Button
              key={metric}
              variant={activeMetric === metric ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveMetric(metric)}
              className={cn(
                "capitalize",
                activeMetric === metric && ""
              )}
              variant={activeMetric === metric ? "default" : "neutral"}
            >
              {metric}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Heatmap Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-xl border-2 border-charcoal min-h-[300px] h-[400px] lg:h-[500px]"
          >
            <svg
              ref={svgRef}
              width="100%"
              height="100%"
              viewBox="0 0 480 320"
              preserveAspectRatio="xMidYMid meet"
              className="bg-white"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Grid Background */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Heatmap Cells */}
              {data.map((point, index) => {
                const x = (index % 6) * 80 + 40;
                const y = Math.floor(index / 6) * 80 + 40;
                const value = point[activeMetric];
                const color = getHeatmapColor(value, activeMetric);
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                const cellSize = isMobile ? 50 : 60;
                const fontSize = isMobile ? '10px' : '12px';
                
                return (
                  <motion.g
                    key={`${point.chapter}-${point.section}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <rect
                      x={x}
                      y={y}
                      width={cellSize}
                      height={cellSize}
                      fill={color}
                      stroke="#2d3748"
                      strokeWidth="2"
                      rx="8"
                      className="cursor-pointer transition-all duration-200 hover:stroke-4"
                      onClick={() => setSelectedPoint(point)}
                    />
                    <text
                      x={x + 30}
                      y={y + 25}
                      textAnchor="middle"
                      fontSize={fontSize}
                      className="font-semibold fill-charcoal pointer-events-none"
                    >
                      {point.chapter}
                    </text>
                    <text
                      x={x + 30}
                      y={y + 40}
                      textAnchor="middle"
                      fontSize={fontSize}
                      className="fill-payne pointer-events-none"
                    >
                      {value}%
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </motion.div>
          
          {/* Legend */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-payne">Intensity:</span>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded border-2 border-charcoal" 
                     style={{ backgroundColor: getHeatmapColor(25, activeMetric) }} />
                <span className="text-xs text-payne">Low</span>
                <div className="w-4 h-4 rounded border-2 border-charcoal" 
                     style={{ backgroundColor: getHeatmapColor(50, activeMetric) }} />
                <span className="text-xs text-payne">Medium</span>
                <div className="w-4 h-4 rounded border-2 border-charcoal" 
                     style={{ backgroundColor: getHeatmapColor(75, activeMetric) }} />
                <span className="text-xs text-payne">High</span>
                <div className="w-4 h-4 rounded border-2 border-charcoal" 
                     style={{ backgroundColor: getHeatmapColor(100, activeMetric) }} />
                <span className="text-xs text-payne">Peak</span>
              </div>
            </div>
            
            <div className="text-xs text-payne">
              Zoom: {Math.round(zoomLevel * 100)}%
            </div>
          </div>
          
          {/* Selected Point Details */}
          {selectedPoint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {selectedPoint.chapter} - {selectedPoint.section}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-blue-600">Tension:</span>
                      <p className="font-semibold text-blue-800">{selectedPoint.tension}%</p>
                    </div>
                    <div>
                      <span className="text-blue-600">Pacing:</span>
                      <p className="font-semibold text-blue-800">{selectedPoint.pacing}%</p>
                    </div>
                    <div>
                      <span className="text-blue-600">Engagement:</span>
                      <p className="font-semibold text-blue-800">{selectedPoint.engagement}%</p>
                    </div>
                    <div>
                      <span className="text-blue-600">Words:</span>
                      <p className="font-semibold text-blue-800">{selectedPoint.wordCount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPoint(null)}
                >
                  ×
                </Button>
              </div>
            </motion.div>
          )}
          
          {/* Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="h-4 w-4 text-red-600" />
                <h5 className="font-semibold text-red-800">Pacing Alert</h5>
              </div>
              <p className="text-red-700 text-sm">
                Chapter 4 shows significant drops in all metrics. Consider adding conflict or reducing exposition.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="h-4 w-4 text-green-600" />
                <h5 className="font-semibold text-green-800">Strong Sections</h5>
              </div>
              <p className="text-green-700 text-sm">
                Chapters 1, 3, and 5-6 maintain excellent tension and reader engagement throughout.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}