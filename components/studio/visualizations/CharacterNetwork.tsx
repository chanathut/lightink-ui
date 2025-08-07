"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Heart, Zap, Filter, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CharacterNode {
  id: string;
  name: string;
  role: 'protagonist' | 'antagonist' | 'supporting' | 'minor';
  dialogueCount: number;
  sceneCount: number;
  development: number;
  x?: number;
  y?: number;
}

interface CharacterConnection {
  source: string;
  target: string;
  strength: number;
  type: 'conflict' | 'alliance' | 'romance' | 'family' | 'neutral';
  interactions: number;
}

interface CharacterNetworkProps {
  nodes?: CharacterNode[];
  connections?: CharacterConnection[];
  className?: string;
}

// Mock data for demonstration
const mockNodes: CharacterNode[] = [
  { id: 'protagonist', name: 'Elena', role: 'protagonist', dialogueCount: 245, sceneCount: 28, development: 85 },
  { id: 'antagonist', name: 'Marcus', role: 'antagonist', dialogueCount: 156, sceneCount: 18, development: 70 },
  { id: 'love-interest', name: 'David', role: 'supporting', dialogueCount: 134, sceneCount: 22, development: 65 },
  { id: 'mentor', name: 'Professor Chen', role: 'supporting', dialogueCount: 89, sceneCount: 12, development: 60 },
  { id: 'friend', name: 'Sarah', role: 'supporting', dialogueCount: 78, sceneCount: 15, development: 55 },
  { id: 'rival', name: 'Jessica', role: 'supporting', dialogueCount: 67, sceneCount: 11, development: 50 },
  { id: 'parent', name: 'Mom', role: 'minor', dialogueCount: 34, sceneCount: 6, development: 40 },
  { id: 'colleague', name: 'Tom', role: 'minor', dialogueCount: 23, sceneCount: 4, development: 35 },
];

const mockConnections: CharacterConnection[] = [
  { source: 'protagonist', target: 'antagonist', strength: 90, type: 'conflict', interactions: 45 },
  { source: 'protagonist', target: 'love-interest', strength: 85, type: 'romance', interactions: 38 },
  { source: 'protagonist', target: 'mentor', strength: 70, type: 'alliance', interactions: 25 },
  { source: 'protagonist', target: 'friend', strength: 75, type: 'alliance', interactions: 32 },
  { source: 'protagonist', target: 'rival', strength: 60, type: 'conflict', interactions: 18 },
  { source: 'protagonist', target: 'parent', strength: 65, type: 'family', interactions: 12 },
  { source: 'love-interest', target: 'friend', strength: 45, type: 'neutral', interactions: 15 },
  { source: 'antagonist', target: 'rival', strength: 55, type: 'alliance', interactions: 8 },
  { source: 'mentor', target: 'colleague', strength: 40, type: 'neutral', interactions: 6 },
];

export default function CharacterNetwork({ 
  nodes = mockNodes, 
  connections = mockConnections, 
  className 
}: CharacterNetworkProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<CharacterNode | null>(null);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showConnections, setShowConnections] = useState(true);

  // Position nodes in a circular layout
  const positionedNodes = nodes.map((node, index) => {
    const angle = (index / nodes.length) * 2 * Math.PI;
    const radius = node.role === 'protagonist' ? 50 : 
                   node.role === 'antagonist' ? 80 : 
                   node.role === 'supporting' ? 120 : 160;
    
    return {
      ...node,
      x: 200 + Math.cos(angle) * radius,
      y: 200 + Math.sin(angle) * radius,
    };
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'protagonist': return '#10b981'; // Green
      case 'antagonist': return '#ef4444'; // Red
      case 'supporting': return '#3b82f6'; // Blue
      case 'minor': return '#6b7280'; // Gray
      default: return '#6b7280';
    }
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'conflict': return '#ef4444'; // Red
      case 'alliance': return '#10b981'; // Green
      case 'romance': return '#ec4899'; // Pink
      case 'family': return '#f59e0b'; // Amber
      case 'neutral': return '#6b7280'; // Gray
      default: return '#6b7280';
    }
  };

  const getNodeSize = (node: CharacterNode) => {
    switch (node.role) {
      case 'protagonist': return 25;
      case 'antagonist': return 22;
      case 'supporting': return 18;
      case 'minor': return 14;
      default: return 14;
    }
  };

  const filteredNodes = filterRole === 'all' 
    ? positionedNodes 
    : positionedNodes.filter(node => node.role === filterRole);

  const filteredConnections = connections.filter(conn => 
    filteredNodes.some(node => node.id === conn.source) &&
    filteredNodes.some(node => node.id === conn.target)
  );

  const handleReset = () => {
    setSelectedNode(null);
    setFilterRole('all');
    setShowConnections(true);
  };

  return (
    <Card className={cn("neo-brutal-card", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-museo flex items-center space-x-2">
              <Users className="h-6 w-6" />
              <span>Character Network</span>
              <Badge variant="outline" className="text-xs">
                Interactive
              </Badge>
            </CardTitle>
            <CardDescription className="text-base">
              Explore character relationships, interactions, and development arcs
            </CardDescription>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-payne" />
            <span className="text-sm font-medium text-payne">Filter:</span>
            {['all', 'protagonist', 'antagonist', 'supporting', 'minor'].map((role) => (
              <Button
                key={role}
                variant={filterRole === role ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterRole(role)}
                className={cn(
                  "capitalize text-xs",
                  filterRole === role && ""
                )}
                variant={filterRole === role ? "default" : "neutral"}
              >
                {role}
              </Button>
            ))}
          </div>
          
          <Button
            variant={showConnections ? "default" : "neutral"}
            size="sm"
            onClick={() => setShowConnections(!showConnections)}
            className=""
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Connections
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Network Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-xl border-2 border-charcoal bg-white min-h-[400px] h-[500px] lg:h-[600px]"
          >
            <svg
              ref={svgRef}
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background Grid */}
              <defs>
                <pattern id="networkGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f9fafb" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#networkGrid)" />
              
              {/* Connections */}
              {showConnections && filteredConnections.map((connection, index) => {
                const sourceNode = filteredNodes.find(n => n.id === connection.source);
                const targetNode = filteredNodes.find(n => n.id === connection.target);
                
                if (!sourceNode || !targetNode) return null;
                
                return (
                  <motion.line
                    key={`${connection.source}-${connection.target}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={getConnectionColor(connection.type)}
                    strokeWidth={Math.max(1, connection.strength / 20)}
                    strokeDasharray={connection.type === 'conflict' ? '5,5' : 'none'}
                  />
                );
              })}
              
              {/* Character Nodes */}
              {filteredNodes.map((node, index) => (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedNode(node)}
                >
                  {/* Node Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={getNodeSize(node)}
                    fill={getRoleColor(node.role)}
                    stroke="#2d3748"
                    strokeWidth="2"
                    className="transition-all duration-200 hover:stroke-4"
                  />
                  
                  {/* Character Initial */}
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    className="text-sm font-bold fill-white pointer-events-none"
                  >
                    {node.name.charAt(0)}
                  </text>
                  
                  {/* Character Name */}
                  <text
                    x={node.x}
                    y={node.y + getNodeSize(node) + 15}
                    textAnchor="middle"
                    className="text-xs lg:text-sm font-medium fill-charcoal pointer-events-none"
                  >
                    {node.name}
                  </text>
                </motion.g>
              ))}
            </svg>
          </motion.div>
          
          {/* Legend */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-charcoal mb-3">Character Roles</h4>
              <div className="space-y-2">
                {[
                  { role: 'protagonist', label: 'Protagonist', color: getRoleColor('protagonist') },
                  { role: 'antagonist', label: 'Antagonist', color: getRoleColor('antagonist') },
                  { role: 'supporting', label: 'Supporting', color: getRoleColor('supporting') },
                  { role: 'minor', label: 'Minor', color: getRoleColor('minor') },
                ].map(({ role, label, color }) => (
                  <div key={role} className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-charcoal"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-payne">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-charcoal mb-3">Relationship Types</h4>
              <div className="space-y-2">
                {[
                  { type: 'conflict', label: 'Conflict', color: getConnectionColor('conflict') },
                  { type: 'alliance', label: 'Alliance', color: getConnectionColor('alliance') },
                  { type: 'romance', label: 'Romance', color: getConnectionColor('romance') },
                  { type: 'family', label: 'Family', color: getConnectionColor('family') },
                  { type: 'neutral', label: 'Neutral', color: getConnectionColor('neutral') },
                ].map(({ type, label, color }) => (
                  <div key={type} className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-1 border border-charcoal"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-payne">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Selected Character Details */}
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-purple-800 mb-2 flex items-center space-x-2">
                    <span>{selectedNode.name}</span>
                    <Badge 
                      style={{ backgroundColor: getRoleColor(selectedNode.role) }}
                      className="text-white capitalize"
                    >
                      {selectedNode.role}
                    </Badge>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-purple-600">Dialogue Lines:</span>
                      <p className="font-semibold text-purple-800">{selectedNode.dialogueCount}</p>
                    </div>
                    <div>
                      <span className="text-purple-600">Scenes:</span>
                      <p className="font-semibold text-purple-800">{selectedNode.sceneCount}</p>
                    </div>
                    <div>
                      <span className="text-purple-600">Development:</span>
                      <p className="font-semibold text-purple-800">{selectedNode.development}%</p>
                    </div>
                    <div>
                      <span className="text-purple-600">Connections:</span>
                      <p className="font-semibold text-purple-800">
                        {connections.filter(c => c.source === selectedNode.id || c.target === selectedNode.id).length}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedNode(null)}
                >
                  ×
                </Button>
              </div>
            </motion.div>
          )}
          
          {/* Character Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="h-4 w-4 text-green-600" />
                <h5 className="font-semibold text-green-800">Strong Relationships</h5>
              </div>
              <p className="text-green-700 text-sm">
                Elena and David show excellent romantic chemistry with 38 meaningful interactions.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-4 w-4 text-yellow-600" />
                <h5 className="font-semibold text-yellow-800">Development Opportunity</h5>
              </div>
              <p className="text-yellow-700 text-sm">
                Supporting characters could benefit from more individual development and unique voices.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}