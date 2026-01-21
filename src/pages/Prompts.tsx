import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GitBranch, Star, AlertCircle, Clock, TrendingUp } from "lucide-react";

const promptVersions = [
  {
    version: "v24",
    timestamp: "Today, 12:35 PM",
    reward: 0.94,
    isBest: true,
    change: "Added constraint: verify all function references before output",
    status: "active",
  },
  {
    version: "v23",
    timestamp: "Today, 11:22 AM",
    reward: 0.89,
    isBest: false,
    change: "Improved reasoning chain structure for complex tasks",
    status: "success",
  },
  {
    version: "v22",
    timestamp: "Yesterday, 4:15 PM",
    reward: 0.72,
    isBest: false,
    change: "Reduced verbose explanations, focus on actionable steps",
    status: "failed",
    failureReason: "Hallucination rate increased by 15%",
  },
  {
    version: "v21",
    timestamp: "Yesterday, 2:30 PM",
    reward: 0.85,
    isBest: false,
    change: "Added self-verification step before final output",
    status: "success",
  },
  {
    version: "v20",
    timestamp: "2 days ago",
    reward: 0.82,
    isBest: false,
    change: "Introduced tool selection heuristics",
    status: "success",
  },
];

export default function Prompts() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <GitBranch className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Prompt Evolution</h1>
          </div>
          <p className="text-muted-foreground">
            Track how the agent's prompts evolve through self-improvement
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Total Versions</span>
            </div>
            <p className="text-2xl font-bold text-foreground">24</p>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-warning" />
              <span className="text-xs text-muted-foreground">Best Reward</span>
            </div>
            <p className="text-2xl font-bold text-foreground">0.94</p>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Avg. Time Between</span>
            </div>
            <p className="text-2xl font-bold text-foreground">2.4h</p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-purple to-transparent" />

          <div className="space-y-4">
            {promptVersions.map((prompt, index) => (
              <motion.div
                key={prompt.version}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative pl-16"
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-4 top-6 w-4 h-4 rounded-full border-2 ${
                    prompt.isBest
                      ? "bg-primary border-primary glow-cyan"
                      : prompt.status === "failed"
                      ? "bg-destructive border-destructive"
                      : "bg-muted border-border"
                  }`}
                />

                <div
                  className={`glass-card p-5 ${
                    prompt.isBest ? "gradient-border" : ""
                  } ${prompt.status === "failed" ? "border-destructive/30" : ""}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-foreground">
                        {prompt.version}
                      </span>
                      {prompt.isBest && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-primary/20 rounded-full text-xs text-primary">
                          <Star className="w-3 h-3" />
                          Best
                        </span>
                      )}
                      {prompt.status === "active" && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-success/20 rounded-full text-xs text-success">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold gradient-text">
                        {prompt.reward.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">reward</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground mb-2">{prompt.change}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {prompt.timestamp}
                    </span>
                    {prompt.failureReason && (
                      <span className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="w-3 h-3" />
                        {prompt.failureReason}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
