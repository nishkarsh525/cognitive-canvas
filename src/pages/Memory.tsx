import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Brain, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Node {
  id: string;
  type: "prompt" | "task" | "memory";
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: string[];
}

const initialNodes: Node[] = [
  { id: "p1", type: "prompt", label: "v24", x: 400, y: 300, vx: 0, vy: 0, connections: ["p2", "t1", "t2"] },
  { id: "p2", type: "prompt", label: "v23", x: 300, y: 200, vx: 0, vy: 0, connections: ["p3", "t3"] },
  { id: "p3", type: "prompt", label: "v22", x: 200, y: 300, vx: 0, vy: 0, connections: ["m1"] },
  { id: "t1", type: "task", label: "Code Analysis", x: 500, y: 200, vx: 0, vy: 0, connections: ["m2"] },
  { id: "t2", type: "task", label: "Security Scan", x: 550, y: 350, vx: 0, vy: 0, connections: ["m3"] },
  { id: "t3", type: "task", label: "Optimization", x: 350, y: 400, vx: 0, vy: 0, connections: ["m1", "m2"] },
  { id: "m1", type: "memory", label: "Pattern A", x: 150, y: 400, vx: 0, vy: 0, connections: [] },
  { id: "m2", type: "memory", label: "Pattern B", x: 600, y: 250, vx: 0, vy: 0, connections: [] },
  { id: "m3", type: "memory", label: "Pattern C", x: 650, y: 400, vx: 0, vy: 0, connections: [] },
];

const nodeColors = {
  prompt: { fill: "hsl(192, 91%, 56%)", stroke: "hsl(192, 91%, 66%)" },
  task: { fill: "hsl(262, 83%, 58%)", stroke: "hsl(262, 83%, 68%)" },
  memory: { fill: "hsl(142, 71%, 45%)", stroke: "hsl(142, 71%, 55%)" },
};

export default function Memory() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [zoom, setZoom] = useState(1);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Simple force simulation
    const simulate = () => {
      setNodes((currentNodes) => {
        const newNodes = currentNodes.map((node) => ({ ...node }));

        // Apply forces
        for (let i = 0; i < newNodes.length; i++) {
          for (let j = i + 1; j < newNodes.length; j++) {
            const dx = newNodes[j].x - newNodes[i].x;
            const dy = newNodes[j].y - newNodes[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 500 / (dist * dist);

            newNodes[i].vx -= (dx / dist) * force;
            newNodes[i].vy -= (dy / dist) * force;
            newNodes[j].vx += (dx / dist) * force;
            newNodes[j].vy += (dy / dist) * force;
          }

          // Spring force for connections
          for (const connId of newNodes[i].connections) {
            const conn = newNodes.find((n) => n.id === connId);
            if (conn) {
              const dx = conn.x - newNodes[i].x;
              const dy = conn.y - newNodes[i].y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const force = (dist - 100) * 0.01;

              newNodes[i].vx += dx * force;
              newNodes[i].vy += dy * force;
            }
          }

          // Center gravity
          newNodes[i].vx += (canvas.width / 2 - newNodes[i].x) * 0.001;
          newNodes[i].vy += (canvas.height / 2 - newNodes[i].y) * 0.001;

          // Apply velocity with damping
          newNodes[i].x += newNodes[i].vx * 0.1;
          newNodes[i].y += newNodes[i].vy * 0.1;
          newNodes[i].vx *= 0.9;
          newNodes[i].vy *= 0.9;

          // Bounds
          newNodes[i].x = Math.max(50, Math.min(canvas.width - 50, newNodes[i].x));
          newNodes[i].y = Math.max(50, Math.min(canvas.height - 50, newNodes[i].y));
        }

        return newNodes;
      });
    };

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(zoom, zoom);

      // Draw connections
      for (const node of nodes) {
        for (const connId of node.connections) {
          const conn = nodes.find((n) => n.id === connId);
          if (conn) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(conn.x, conn.y);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const colors = nodeColors[node.type];
        const isHovered = hoveredNode?.id === node.id;
        const radius = isHovered ? 25 : 20;

        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 10, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(node.x, node.y, radius, node.x, node.y, radius + 15);
        gradient.addColorStop(0, colors.fill.replace(")", ", 0.3)").replace("hsl", "hsla"));
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.fill;
        ctx.fill();
        ctx.strokeStyle = colors.stroke;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label
        ctx.fillStyle = "white";
        ctx.font = "11px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, node.x, node.y);
      }

      ctx.restore();

      simulate();
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Mouse handling
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom;
      const y = (e.clientY - rect.top) / zoom;

      const hovered = nodes.find((node) => {
        const dist = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
        return dist < 25;
      });

      setHoveredNode(hovered || null);
      canvas.style.cursor = hovered ? "pointer" : "default";
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", updateSize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes, hoveredNode, zoom]);

  return (
    <DashboardLayout>
      <div className="p-8 h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Memory Graph</h1>
            </div>
            <p className="text-muted-foreground">
              Visualize agent knowledge connections and learning patterns
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
              className="bg-muted/50"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-xs text-muted-foreground w-12 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
              className="bg-muted/50"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-muted/50">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-6 mb-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Prompt Version</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple" />
            <span className="text-xs text-muted-foreground">Task</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">Memory Pattern</span>
          </div>
        </motion.div>

        {/* Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 glass-card overflow-hidden relative"
        >
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Hover Info */}
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 glass-card p-4"
            >
              <h4 className="text-sm font-semibold text-foreground">{hoveredNode.label}</h4>
              <p className="text-xs text-muted-foreground capitalize">{hoveredNode.type}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {hoveredNode.connections.length} connection{hoveredNode.connections.length !== 1 ? "s" : ""}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
