import { motion } from "framer-motion";

const tools = [
  { name: "Code Analyzer", success: 0.94, calls: 234 },
  { name: "Web Search", success: 0.87, calls: 156 },
  { name: "File Reader", success: 0.98, calls: 89 },
  { name: "Calculator", success: 1.0, calls: 45 },
  { name: "API Caller", success: 0.72, calls: 67 },
  { name: "Text Parser", success: 0.91, calls: 198 },
];

function getHeatColor(value: number): string {
  if (value >= 0.95) return "bg-success";
  if (value >= 0.85) return "bg-success/70";
  if (value >= 0.75) return "bg-warning";
  return "bg-destructive/70";
}

export function ToolSuccessHeatmap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Tool Success Rate</h3>
          <p className="text-xs text-muted-foreground">Performance by tool type</p>
        </div>
      </div>

      <div className="space-y-2">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            className="flex items-center gap-3"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground truncate">
                  {tool.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {tool.calls} calls
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${tool.success * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                  className={`h-full rounded-full ${getHeatColor(tool.success)}`}
                />
              </div>
            </div>
            <span className="text-xs font-mono text-muted-foreground w-12 text-right">
              {(tool.success * 100).toFixed(0)}%
            </span>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">95%+</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-success/70" />
          <span className="text-xs text-muted-foreground">85-95%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-warning" />
          <span className="text-xs text-muted-foreground">75-85%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-destructive/70" />
          <span className="text-xs text-muted-foreground">&lt;75%</span>
        </div>
      </div>
    </motion.div>
  );
}
